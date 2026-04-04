'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                        <CheckCircle2 className="w-10 h-10 text-black" strokeWidth={2.5} />
                    </div>
                </div>

                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Acquisition Confirmed</h1>
                <p className="text-zinc-500 text-sm font-light italic mb-10 leading-relaxed">
                    Your selected assets have been successfully secured. A formal certificate of authenticity and logistics details have been sent to your archive email.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-all"
                    >
                        Return to Collection <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button className="w-full border border-white/10 text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                        Download Invoice <Download className="w-4 h-4" />
                    </button>
                </div>

                <p className="mt-12 text-[8px] font-bold uppercase tracking-[0.6em] text-zinc-800">
                    Transaction ID: #ARC-{Math.random().toString(36).substring(7).toUpperCase()}
                </p>
            </motion.div>
        </div>
    )
}