'use client'

import { useState, useActionState } from 'react'
import { createProduct } from '@/app/actions/products'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react'

export default function AddProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, { error: "", success: false })
    // NEW: File state for CAT-4
    const [file, setFile] = useState<File | null>(null)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: acceptedFiles => setFile(acceptedFiles[0])
    })

    return (
        <div className="min-h-screen bg-white text-black p-10 font-sans">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">← Back to Archive</Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-4">Inventory Entry</h1>
                    <p className="text-zinc-400 text-xs italic">CAT-4 / Create a new product record in the marketplace.</p>
                </header>

                {state.success && (
                    <div className="bg-black text-white p-6 mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-center animate-pulse">
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
                                <select name="category" className="w-full bg-transparent outline-none text-lg appearance-none bg-white">
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

                        {/* NEW: DRAG & DROP ZONE (CAT-4 Requirement) */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Product Imagery</label>
                            <div {...getRootProps()} className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all rounded-sm
                                ${isDragActive ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'}`}>
                                <input {...getInputProps()} name="productImage" />

                                {file ? (
                                    <div className="flex items-center justify-between bg-zinc-100 p-4 border border-zinc-200">
                                        <div className="flex items-center gap-3">
                                            <ImageIcon className="w-4 h-4 text-zinc-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[200px]">{file.name}</span>
                                        </div>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="hover:text-red-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <UploadCloud className="w-8 h-8 mb-3 text-zinc-200" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                            {isDragActive ? "Drop Asset Now" : "Drag Image or Browse Archive"}
                                        </p>
                                        <p className="text-[8px] text-zinc-300 mt-2">PNG, JPG, or WEBP up to 10MB</p>
                                    </div>
                                )}
                            </div>
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