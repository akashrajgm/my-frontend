'use client'

import React, { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 1. Fetch User Profile
        const userRes = await fetch('https://interior-marketplace-api.onrender.com/users/me', {
          headers: {
            // We'll need to handle the token here once we move to a 
            // dedicated fetch wrapper, but for now, we're just checking the connection.
            'Content-Type': 'application/json'
          }
        })
        const user = await userRes.json()
        setUserData(user)

        // 2. Fetch Products (Using the correct /products endpoint!)
        const prodRes = await fetch('https://interior-marketplace-api.onrender.com/products')
        const products = await prodRes.json()
        setProductCount(Array.isArray(products) ? products.length : 0)

      } catch (error) {
        console.error("Dashboard Fetch Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 animate-pulse">Syncing Archive...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              {userData?.full_name || 'Archive'} Dashboard
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
              ID: {userData?.email || 'Unauthorized User'} / Session Active
            </p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Role / {userData?.role || 'Guest'}
          </div>
        </header>

        {/* CONTENT GRID */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Inventory</h2>
            <p className="text-3xl font-light">{productCount}</p>
          </div>

          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Orders</h2>
            <p className="text-3xl font-light">0</p>
          </div>

          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Vendor Status</h2>
            <p className={`text-sm font-black uppercase tracking-widest ${userData?.role === 'vendor' ? 'text-green-500' : 'text-yellow-500'}`}>
              {userData?.role === 'vendor' ? 'Verified Partner' : 'Pending Setup'}
            </p>
          </div>
        </main>

        {/* RECENT ACTIVITY */}
        <section className="pt-12">
          <div className="border border-dashed border-zinc-800 p-20 text-center">
            {productCount > 0 ? (
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                Records Synced Successfully
              </p>
            ) : (
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
                No Data Records Found in the Archive
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}