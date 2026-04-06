'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

interface CartItem {
    id: string
    name: string
    price: number
    image_url: string
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: any) => Promise<void>
    removeFromCart: (id: string) => Promise<void>
    clearCart: () => void
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    // 1. INITIAL LOAD: Pull the saved archive from the browser's memory
    useEffect(() => {
        const savedCart = localStorage.getItem('studio_archive_cart')
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (e) {
                console.error("Archive Corruption: Resetting local cart.", e)
            }
        }
    }, [])

    // 2. PERSISTENCE: Keep the local archive updated on every change
    useEffect(() => {
        localStorage.setItem('studio_archive_cart', JSON.stringify(cart))
    }, [cart])

    /**
     * THARUN'S BACKEND SYNC (EPIC 5)
     * This is the bridge between your UI and Tharun's Database.
     */
    const syncWithBackend = async (productId: string, quantity: number, method: 'POST' | 'DELETE' = 'POST') => {
        // We grab the token that was saved during the Login process
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://interior-marketplace-api.onrender.com';

        // GHOST MODE: If no token exists, we just save locally and don't bother the server
        if (!token) {
            console.warn("Studio Archive: No Auth Token. Syncing locally only.");
            return;
        }

        try {
            const url = method === 'POST' ? `${baseUrl}/cart` : `${baseUrl}/cart/${productId}`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // THE JWT HANDSHAKE
                },
                body: method === 'POST' ? JSON.stringify({
                    product_id: Number(productId), // Tharun's integer requirement
                    quantity: quantity
                }) : null
            });

            if (response.ok) {
                console.log(`Cloud Sync Successful: ${method} asset ${productId}`);
            } else {
                const error = await response.json();
                console.error("Tharun's Server Rejected Sync:", error.detail);
            }
        } catch (err) {
            console.error("Network Failure: Could not reach the Archive Server.", err);
        }
    };

    const addToCart = async (product: any) => {
        // A. OPTIMISTIC UI: Update the screen instantly
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1, price: Number(product.price) }]
        })

        // B. BACKEND HANDSHAKE
        await syncWithBackend(product.id, 1, 'POST');

        toast.success(`${product.name} secured in collection.`)
    }

    const removeFromCart = async (id: string) => {
        // A. Update UI
        setCart(prev => prev.filter(item => item.id !== id))

        // B. Tell Tharun to remove it from the Cloud Database
        await syncWithBackend(id, 0, 'DELETE');

        toast.info("Asset removed from current session.")
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('studio_archive_cart')
    }

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")
    return context
}