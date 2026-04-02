'use client'
import { ShoppingBag, Search, User, Menu } from 'lucide-react';

export default function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
    return (
        <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-white/5 h-24 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex justify-between items-center">

                {/* Left: Brand Logo */}
                <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter uppercase leading-none">STUDIO ARCHIVE</span>
                    <span className="text-[8px] tracking-[0.6em] uppercase text-neutral-500 mt-1">Interior Marketplace</span>
                </div>

                {/* Center: Search Bar (Desktop) */}
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96 group focus-within:border-brass transition-all">
                    <Search className="w-4 h-4 text-neutral-500 group-focus-within:text-brass" />
                    <input
                        type="text"
                        placeholder="Search Collection..."
                        className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest px-3 w-full text-white placeholder:text-neutral-700"
                    />
                </div>

                {/* Right: Icons & Auth */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6 text-neutral-400">
                        <button className="hover:text-white transition relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 bg-brass text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </button>
                        <button onClick={onAuthClick} className="hover:text-white transition">
                            <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                    </div>
                    <button className="lg:hidden text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}