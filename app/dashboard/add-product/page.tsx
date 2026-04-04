'use client'

import { useState, useActionState } from 'react'
import { createProduct } from '@/app/actions/products'
import { generateAIContent } from '@/app/actions/ai' // This is the AI "Brain"
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react'

export default function AddProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, { error: "", success: false })
    const [file, setFile] = useState<File | null>(null)
    const [isAiGenerating, setIsAiGenerating] = useState(false)

    // STEP 3 LOGIC: "Controlled" state so the AI can change these values
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Furniture',
        description: ''
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: acceptedFiles => setFile(acceptedFiles[0])
    })

    // The function that triggers the AI fill
    const handleMagicFill = async () => {
        if (!file) return alert("Please upload an image first.")

        setIsAiGenerating(true)
        const aiResponse = await generateAIContent(file.name)

        if (aiResponse) {
            setFormData({
                name: aiResponse.title || '',
                description: aiResponse.description || '',
                category: aiResponse.category || 'Furniture',
                price: formData.price // Keep whatever price the user already typed
            })
        }
        setIsAiGenerating(false)
    }

    return (
        <div className="min-h-screen bg-white text-black p-10 font-sans">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">← Back to Archive</Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-4 leading-none">Inventory Entry</h1>
                    <p className="text-zinc-400 text-xs italic">AI-2 / Automate your listing with Gemini Vision.</p>
                </header>

                <form action={formAction} className="grid grid-cols-1 gap-10">
                    <div className="space-y-6">

                        {/* 1. PRODUCT NAME (Updated with Magic Button) */}
                        <div className="border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Product Name</label>
                                {file && (
                                    <button
                                        type="button"
                                        onClick={handleMagicFill}
                                        disabled={isAiGenerating}
                                        className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#D4AF37] hover:text-black transition-colors"
                                    >
                                        {isAiGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                        Magic Fill
                                    </button>
                                )}
                            </div>
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Eames Lounge Chair"
                                className="w-full bg-transparent outline-none text-lg font-black uppercase tracking-tighter"
                            />
                        </div>

                        {/* 2. PRICE & CATEGORY */}
                        <div className="grid grid-cols-2 gap-10">
                            <div className="border-b border-zinc-200 py-2">
                                <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Price (USD)</label>
                                <input
                                    name="price"
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-transparent outline-none text-lg font-mono"
                                />
                            </div>
                            <div className="border-b border-zinc-200 py-2">
                                <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-transparent outline-none text-lg font-bold bg-white"
                                >
                                    <option>Furniture</option>
                                    <option>Lighting</option>
                                    <option>Textiles</option>
                                    <option>Decor</option>
                                </select>
                            </div>
                        </div>

                        {/* 3. DESCRIPTION (Updated for AI) */}
                        <div className="border-b border-zinc-200 py-2">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the craftsmanship..."
                                className="w-full bg-transparent outline-none text-sm mt-2 italic font-light"
                            />
                        </div>

                        {/* 4. DRAG & DROP ZONE */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Product Imagery</label>
                            <div {...getRootProps()} className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all rounded-sm
                                ${isDragActive ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'}`}>
                                <input {...getInputProps()} name="productImage" />
                                {file ? (
                                    <div className="flex items-center justify-between bg-zinc-100 p-4">
                                        <div className="flex items-center gap-3">
                                            <ImageIcon className="w-4 h-4 text-zinc-400" />
                                            <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{file.name}</span>
                                        </div>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}><X className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <UploadCloud className="w-8 h-8 mb-3 text-zinc-200" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Drag Image to Start</p>
                                        <p className="text-[8px] text-zinc-300 mt-2 italic">Unlock Magic Fill with an image</p>
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