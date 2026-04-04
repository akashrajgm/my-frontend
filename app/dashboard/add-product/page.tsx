'use client'

import { useActionState } from 'react'
import { createProduct } from '@/app/actions/products'
import Link from 'next/link'

export default function AddProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, { error: "", success: false })

    return (
        <div className="min-h-screen bg-white text-black p-10 font-sans">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">← Back to Archive</Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-4">Inventory Entry</h1>
                    <p className="text-zinc-400 text-xs italic">CAT-4 / Create a new product record in the marketplace.</p>
                </header>

                {state.success && (
                    <div className="bg-black text-white p-6 mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-center">
                        Product successfully archived in the database.
                    </div>
                )}

                <form action={formAction} className="grid grid-cols-1 gap-10">
                    <div className="space-y-6">
                        {/* NAME */}
                        <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Product Name</label>
                            <input name="name" type="text" required placeholder="e.g. Eames Lounge Chair" className="w-full bg-transparent outline-none text-lg" />
                        </div>

                        {/* PRICE & CATEGORY */}
                        <div className="grid grid-cols-2 gap-10">
                            <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                                <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Price (USD)</label>
                                <input name="price" type="number" required placeholder="0.00" className="w-full bg-transparent outline-none text-lg" />
                            </div>
                            <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                                <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Category</label>
                                <select name="category" className="w-full bg-transparent outline-none text-lg appearance-none">
                                    <option>Furniture</option>
                                    <option>Lighting</option>
                                    <option>Textiles</option>
                                    <option>Decor</option>
                                </select>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Description</label>
                            <textarea name="description" required rows={3} placeholder="Describe the craftsmanship..." className="w-full bg-transparent outline-none text-sm mt-2" />
                        </div>

                        {/* IMAGE URL (CAT-2 Placeholder) */}
                        <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest text-red-500">Image URL (Temporary)</label>
                            <input name="imageUrl" type="url" placeholder="https://images.unsplash.com/..." className="w-full bg-transparent outline-none text-sm mt-2 italic" />
                        </div>
                    </div>

                    <button disabled={isPending} className="bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all disabled:opacity-50">
                        {isPending ? "Syncing..." : "Commit to Archive"}
                    </button>
                </form>
            </div>
        </div>
    )
}