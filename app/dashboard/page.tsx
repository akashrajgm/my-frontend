'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Edit2, Trash2, Plus, PackageOpen, Loader2 } from 'lucide-react'
// Import the server action we created
import { deleteProduct } from '@/app/actions/products'

export default function MyListingsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fallback Mock Data for local testing
  const MOCK_LISTINGS = [
    { id: '1', name: 'Eames Lounge Chair', price: 4500, category: 'Seating', status: 'Active' },
    { id: '2', name: 'Noguchi Coffee Table', price: 1800, category: 'Tables', status: 'Pending' }
  ]

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // In production, this hits Tharun's real "My Items" endpoint
        const res = await fetch('https://interior-marketplace-api.onrender.com/my-items')
        const data = await res.json()
        setListings(Array.isArray(data) ? data : MOCK_LISTINGS)
      } catch (error) {
        setListings(MOCK_LISTINGS)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  // UPDATED: Fully functional handleDelete
  const handleDelete = async (id: string) => {
    const confirmed = confirm("ARCHIVE WARNING: Are you sure you want to permanently remove this asset from the marketplace?")

    if (confirmed) {
      setDeletingId(id) // Start loading state for this specific button

      const result = await deleteProduct(id)

      if (result?.success) {
        // Optimistic UI update: Remove it from the list immediately
        setListings(prev => prev.filter(item => item.id !== id))
      } else {
        alert(result?.error || "Failed to remove asset. Archive server might be down.")
      }

      setDeletingId(null) // Clear loading state
    }
  }

  return (
    <div className="min-h-screen bg-white text-black p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Merchant Dashboard</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter mt-2 leading-none">Active Archive</h1>
          </div>
          <Link href="/dashboard/add-product" className="bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-800 transition-all">
            <Plus className="w-4 h-4" /> Add Asset
          </Link>
        </header>

        {loading ? (
          <div className="py-20 text-center animate-pulse text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">Syncing Database...</div>
        ) : listings.length === 0 ? (
          <div className="py-32 border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center text-center">
            <PackageOpen className="w-12 h-12 text-zinc-200 mb-4" />
            <h2 className="text-xl font-bold uppercase tracking-tighter">Archive is Empty</h2>
            <p className="text-zinc-400 text-xs mt-2 italic">You haven't listed any architectural elements yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Asset Details</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Category</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Valuation</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-100 group hover:bg-zinc-50 transition-colors">
                    <td className="py-8">
                      <div className="flex flex-col">
                        <span className="text-lg font-black uppercase tracking-tighter leading-none">{item.name}</span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-2 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{item.category}</td>
                    <td className="py-8 text-xl font-mono italic text-zinc-400">${item.price.toLocaleString()}</td>
                    <td className="py-8 text-right">
                      <div className="flex justify-end gap-6">
                        <button className="text-zinc-300 hover:text-black transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="text-zinc-300 hover:text-red-600 transition-colors disabled:opacity-30"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <footer className="mt-20 pt-10 border-t border-zinc-100">
          <p className="text-[8px] text-zinc-300 uppercase tracking-[0.3em]">Merchant Support: support@studioarchive.com</p>
        </footer>
      </div>
    </div>
  )
}