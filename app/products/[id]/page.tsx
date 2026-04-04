'use client'

import React, { useState, useEffect, use } from 'react'
import Navbar from '@/components/ui/Navbar'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Truck, Globe, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getProductById } from '@/app/actions/products'

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    // Unwrapping the params for Next.js 15 compatibility
    const resolvedParams = use(params);
    const [item, setItem] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItem = async () => {
            try {
                // MISSION: Call the real backend action
                const data = await getProductById(resolvedParams.id)

                if (data) {
                    setItem(data)
                } else {
                    // Fallback to mock only if API fails completely
                    setItem({
                        id: resolvedParams.id,
                        name: "Eames Lounge & Ottoman",
                        price: 4500,
                        category: "SEATING",
                        description: "An icon of modern design, this piece represents the pinnacle of 20th-century craftsmanship. Featuring premium leather upholstery and a molded plywood shell.",
                        image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80",
                        specifications: ["Leather: Top-grain", "Wood: Walnut Plywood", "Dimensions: 32\"W x 32\"D x 31\"H"]
                    })
                }
            } catch (error) {
                console.error("Failed to retrieve asset:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchItem()
    }, [resolvedParams.id])

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                Retrieving Asset Metadata...
            </span>
        </div>
    )

    if (!item) return <div className="text-white text-center py-20">Asset Not Found in Archive.</div>

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30">
            {/* Added a dummy onSearch so the Navbar doesn't complain */}
            <Navbar onSearch={() => { }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37] transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Return to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* LEFT: IMAGE GALLERY */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-[4/5] bg-zinc-900 overflow-hidden rounded-sm group"
                    >
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                        />
                        <div className="absolute top-8 left-8 bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-2xl">
                            Asset ID: {item.id.slice(0, 8)}
                        </div>
                    </motion.div>

                    {/* RIGHT: CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase mb-4 block">
                            {item.category} // ARCHIVE SPEC
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                            {item.name}
                        </h1>

                        <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10 italic">
                            "{item.description}"
                        </p>

                        <div className="border-y border-white/5 py-8 mb-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Acquisition Value</span>
                            <span className="text-4xl font-mono italic text-white">${item.price?.toLocaleString()}</span>
                        </div>

                        {/* SPECS - Safely checking for specifications array */}
                        {item.specifications && (
                            <div className="space-y-4 mb-12">
                                {item.specifications.map((spec: string, i: number) => (
                                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{spec.split(':')[0]}</span>
                                        <span className="text-[9px] font-bold uppercase text-white">{spec.split(':')[1]}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ACTION */}
                        <button className="w-full bg-white text-black py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-black transition-all mb-8 shadow-2xl">
                            Request Acquisition
                        </button>

                        {/* TRUST BADGES */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                            <div className="text-center">
                                <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-zinc-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-zinc-600">Authentic</span>
                            </div>
                            <div className="text-center">
                                <Truck className="w-5 h-5 mx-auto mb-2 text-zinc-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-zinc-600">Secure Transport</span>
                            </div>
                            <div className="text-center">
                                <Globe className="w-5 h-5 mx-auto mb-2 text-zinc-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-zinc-600">Global Archive</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}