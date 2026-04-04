'use client'

import React from 'react'
import Link from 'next/link'
import { XCircle, RefreshCcw, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FailurePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                </div>

                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-red-500">Transaction Declined</h1>
                <p className="text-zinc-500 text-sm font-light italic mb-10 leading-relaxed">
                    We were unable to process your acquisition request. This may be due to insufficient funds or a security block from your financial institution.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                    >
                        Retry from Collection <RefreshCcw className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center justify-center gap-2 pt-6 opacity-30">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Contact Support if issue persists</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}