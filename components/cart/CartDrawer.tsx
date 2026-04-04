'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { X, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPaymentOrder } from '@/app/actions/payments' // 1. IMPORT THE ACTION
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false) // 2. LOADING STATE
    const router = useRouter()

    // 3. THE RAZORPAY HANDLER
    const handleCheckout = async () => {
        if (cart.length === 0) return

        setIsProcessing(true)

        try {
            // A. Create Order on the Server
            const order = await createPaymentOrder(cartTotal)

            if (order.error) {
                alert(order.error)
                setIsProcessing(false)
                return
            }

            // B. Razorpay Configuration
            const options = {
                key: "rzp_test_YOUR_KEY_HERE", // Tharun will provide the real key
                amount: order.amount,
                currency: order.currency,
                name: "Studio Archive",
                description: "Architectural Asset Acquisition",
                image: "https://your-logo-url.com/logo.png", // Optional
                order_id: order.id,
                handler: function (response: any) {
                    // C. This runs on SUCCESS (PAY-4 Logic)
                    console.log("Payment Success:", response)
                    clearCart() // Wipe cart after pay
                    onClose() // Close drawer
                    router.push(`/acquisition/success?id=${response.razorpay_payment_id}`)
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                },
                theme: {
                    color: "#000000",
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false)
                    }
                }
            }

            // D. Open the Modal
            const rzp = new (window as any).Razorpay(options)
            rzp.open()

        } catch (err) {
            console.error("Checkout Error:", err)
            alert("Payment gateway failed to initialize.")
            setIsProcessing(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* DRAWER */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white text-black z-[201] shadow-2xl flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-black">Your Archive</h2>
                                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                    {cart.length} Assets Selected
                                </p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-black" />
                            </button>
                        </div>

                        {/* ITEMS LIST */}
                        <div className="flex-grow overflow-y-auto p-8 space-y-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                    <ShoppingBag className="w-12 h-12 mb-4 text-black" strokeWidth={1} />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Archive is Empty</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-24 h-24 bg-zinc-100 overflow-hidden rounded-sm flex-shrink-0">
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-[11px] font-black uppercase tracking-widest leading-tight text-black">{item.name}</h3>
                                                <p className="text-[10px] font-mono mt-1 text-zinc-400">${item.price?.toLocaleString()}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase">Qty: {item.quantity}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-zinc-300 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* FOOTER / CHECKOUT */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-zinc-100 bg-zinc-50">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Valuation</span>
                                    <span className="text-3xl font-black tracking-tighter text-black">${cartTotal.toLocaleString()}</span>
                                </div>

                                {/* 4. UPDATED BUTTON WITH LOADING STATE */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Contacting Treasury...
                                        </>
                                    ) : (
                                        <>
                                            Begin Acquisition <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}