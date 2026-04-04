'use client'

import React from 'react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Archive Dashboard</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
              Authorized Personnel Only / Session Active
            </p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            System / 001
          </div>
        </header>

        {/* CONTENT PLACEHOLDER */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Inventory</h2>
            <p className="text-3xl font-light">0</p>
          </div>

          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Orders</h2>
            <p className="text-3xl font-light">0</p>
          </div>

          <div className="border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Vendor Status</h2>
            <p className="text-sm font-black uppercase tracking-widest text-yellow-500">Pending Setup</p>
          </div>
        </main>

        <section className="pt-12">
          <div className="border border-dashed border-zinc-800 p-20 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
              No Data Records Found in the Archive
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}