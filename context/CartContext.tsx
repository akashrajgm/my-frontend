'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
    id: string
    name: string
    price: number
    image_url: string
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: any) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    // Load from storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('studio_archive_cart')
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Sync to storage on change
    useEffect(() => {
        localStorage.setItem('studio_archive_cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: any) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1, price: Number(product.price) }]
        })
    }

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => setCart([])

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