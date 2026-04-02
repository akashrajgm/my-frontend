'use client'
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rotate-45" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">Interior Marketplace</span>
            </div>

            <div className="flex items-center gap-8">
                <Link href="#gallery" className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-white transition">Collection</Link>
                <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
                    <button className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Login
                    </button>
                    <button className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-500 transition-all">
                        Join
                    </button>
                </div>
            </div>
        </nav>
    );
}