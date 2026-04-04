import React from 'react'
import { getProductById } from '@/app/actions/products'
import Link from 'next/link'

export default async function ProductDetails({ params }: { params: { id: string } }) {
    // Next.js automatically grabs the ID from the URL (e.g. /products/123)
    const product = await getProductById(params.id)

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">
                    Record Not Found in Archive
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans p-10">
            {/* MINIMAL NAV */}
            <nav className="mb-20 max-w-7xl mx-auto">
                <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                    ← Back to Collection
                </Link>
            </nav>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
                {/* LEFT: IMAGE SECTION */}
                <div className="aspect-[4/5] bg-zinc-100 flex items-center justify-center relative overflow-hidden group">
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest italic">Visual Pending</span>
                    )}
                </div>

                {/* RIGHT: INFO SECTION */}
                <div className="flex flex-col justify-center space-y-12">
                    <header className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                            {product.category || 'Classified'}
                        </span>
                        <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.8]">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-light tracking-tight italic">
                            ${product.price}
                        </p>
                    </header>

                    <div className="border-t border-zinc-100 pt-8 max-w-md">
                        <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 text-zinc-300">Specifications</h2>
                        <p className="text-zinc-500 leading-relaxed text-sm">
                            {product.description}
                        </p>
                    </div>

                    <div className="pt-6">
                        <button className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all active:scale-[0.98]">
                            Inquire for Acquisition
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}