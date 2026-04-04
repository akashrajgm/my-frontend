'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => { console.error("CRITICAL ARCHIVE ERROR:", error) }, [error])

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
            <div className="max-w-md">
                <AlertTriangle className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">System Disruption</h2>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed mb-10">
                    The Archive's data stream has been interrupted. This is likely a synchronization error with the main frame.
                </p>
                <button
                    onClick={() => reset()}
                    className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-all"
                >
                    <RotateCcw className="w-4 h-4" /> Re-initialize Archive
                </button>
            </div>
        </div>
    )
}