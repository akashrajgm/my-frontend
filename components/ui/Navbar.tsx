'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu } from 'lucide-react'
import { logout } from '@/app/actions/logout'

interface NavbarProps {
    isLoggedIn?: boolean
    userName?: string
    role?: string // Added role from the other navbar
}

export default function Navbar({ isLoggedIn, userName, role }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/90 backdrop-blur-md font-sans h-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex justify-between items-center">

                {/* LOGO */}
                <Link href="/" className="flex flex-col group">
                    <span className="text-xl font-black uppercase tracking-tighter text-white">
                        Studio Archive
                    </span>
                    <span className="text-[8px] tracking-[0.6em] uppercase text-zinc-500 mt-1">
                        Interior Marketplace
                    </span>
                </Link>

                {/* CENTER: SEARCH */}
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-80 group focus-within:border-zinc-500 transition-all">
                    <Search className="w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search Archive..."
                        className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest px-3 w-full text-white placeholder:text-zinc-700"
                    />
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center space-x-8">
                    <div className="hidden md:flex space-x-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        <Link href="/" className="hover:text-white transition-colors">Collection</Link>

                        {isLoggedIn && (
                            <>
                                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                                {/* Added the Vendor check from the old navbar */}
                                {role === 'vendor' && (
                                    <Link href="/dashboard/my-listings" className="text-zinc-500 hover:text-white transition-colors">Inventory</Link>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
                        <button className="text-zinc-400 hover:text-white transition relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </button>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <span className="hidden sm:block text-[9px] font-bold uppercase tracking-widest text-zinc-500">{userName || 'User'}</span>
                                <button
                                    onClick={() => logout()}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
                                >
                                    Exit
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="text-zinc-400 hover:text-white">
                                <User className="w-5 h-5" strokeWidth={1.5} />
                            </Link>
                        )}

                        <button className="md:hidden text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}