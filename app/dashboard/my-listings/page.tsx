import React from 'react'
import { getMyProducts } from '@/app/actions/products'
import Link from 'next/link'

export default async function MyListings() {
    const listings = await getMyProducts()

    return (
        <div className="min-h-screen bg-black text-white p-10 font-sans">
            <header className="max-w-5xl mx-auto mb-12 flex justify-between items-end">
                <div>
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">← Dashboard</Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-4">My Archive</h1>
                </div>
                <Link href="/dashboard/add-product" className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest">Add Entry</Link>
            </header>

            <main className="max-w-5xl mx-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            <th className="pb-4">Product</th>
                            <th className="pb-4">Category</th>
                            <th className="pb-4">Price</th>
                            <th className="pb-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                        {listings.map((item: any) => (
                            <tr key={item.id} className="group hover:bg-zinc-950 transition-colors">
                                <td className="py-6 text-sm font-bold uppercase">{item.name}</td>
                                <td className="py-6 text-[10px] uppercase text-zinc-500">{item.category}</td>
                                <td className="py-6 text-sm font-light">${item.price}</td>
                                <td className="py-6 text-right space-x-4">
                                    <button className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">Edit</button>
                                    <button className="text-[9px] font-black uppercase tracking-widest text-red-900 hover:text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {listings.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-zinc-800 mt-10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">No active listings found in your archive.</p>
                    </div>
                )}
            </main>
        </div>
    )
}