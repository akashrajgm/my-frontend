'use client'

import React from 'react'
import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react'

export default function SalesFeedPage() {
    // MOCK DATA for Vendor Ops
    const sales = [
        { id: "S-102", item: "Bauhaus Chair", customer: "John D.", revenue: 2200, status: "Processing" },
        { id: "S-101", item: "Noguchi Table", customer: "Sarah K.", revenue: 1800, status: "Paid" }
    ]

    return (
        <div className="p-10 bg-white min-h-screen text-black">
            <header className="mb-12">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Revenue Feed</h1>
                <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-[0.4em]">Vendor Operations & Liquidity</p>
            </header>

            {/* STATS STRIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-zinc-50 p-8 border-l-4 border-black">
                    <DollarSign className="w-4 h-4 mb-4 text-zinc-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Total Earnings</span>
                    <span className="text-3xl font-black tracking-tighter">$4,000.00</span>
                </div>
                <div className="bg-zinc-50 p-8">
                    <TrendingUp className="w-4 h-4 mb-4 text-zinc-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Sales Volume</span>
                    <span className="text-3xl font-black tracking-tighter">02 Units</span>
                </div>
            </div>

            {/* SALES TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-zinc-200">
                            <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Asset</th>
                            <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Acquirer</th>
                            <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Net Value</th>
                            <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {sales.map((sale) => (
                            <tr key={sale.id} className="group hover:bg-zinc-50 transition-colors">
                                <td className="py-6 text-[11px] font-black uppercase tracking-widest">{sale.item}</td>
                                <td className="py-6 text-[10px] font-medium text-zinc-500 italic">{sale.customer}</td>
                                <td className="py-6 text-[11px] font-mono">${sale.revenue.toLocaleString()}</td>
                                <td className="py-6">
                                    <span className="text-[8px] font-black uppercase px-3 py-1 bg-black text-white rounded-full">
                                        {sale.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}