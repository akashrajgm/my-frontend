'use client'

import React, { useEffect, useState } from 'react'
import { getOrders } from '@/app/actions/orders'
import { Package, Clock, CheckCircle2, Truck, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders()
            setOrders(data)
            setLoading(false)
        }
        fetchOrders()
    }, [])

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return <CheckCircle2 className="w-3 h-3 text-green-500" />
            case 'shipped': return <Truck className="w-3 h-3 text-blue-500" />
            default: return <Clock className="w-3 h-3 text-[#D4AF37]" />
        }
    }

    if (loading) return <div className="p-10 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Synchronizing Order History...</div>

    return (
        <div className="p-10 bg-white min-h-screen text-black font-sans">
            <header className="mb-16">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Acquisition Log</h1>
                <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-[0.4em]">Personal Collection Archive</p>
            </header>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="border border-zinc-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-black transition-all group">
                        <div className="flex gap-8 items-center">
                            <div className="bg-zinc-50 p-4">
                                <Package className="w-6 h-6 text-zinc-300" />
                            </div>
                            <div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Order ID</span>
                                <h3 className="text-sm font-black uppercase mb-1">{order.id}</h3>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(order.status)}
                                    <span className="text-[9px] font-bold uppercase tracking-widest">{order.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-0 text-left md:text-right flex flex-col gap-1">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Value</span>
                            <span className="text-lg font-mono italic">${order.total?.toLocaleString()}</span>
                            <span className="text-[9px] font-bold text-zinc-300">{order.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}