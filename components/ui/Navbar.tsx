'use client'

import React from 'react'
import Link from 'next/link'
import { logout } from '@/app/actions/logout'

interface NavbarProps {
    isLoggedIn?: boolean
    userName?: string
}

export default function Navbar({ isLoggedIn, userName }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex justify-between items-center">

                {/* LOGO */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-2 h-2 bg-black transition-transform group-hover:rotate-45" />
                    <span className="text-xl font-black uppercase tracking-tighter">
                        Studio Archive
                    </span>
                </Link>

                {/* NAVIGATION */}
                <div className="flex items-center space-x-10">
                    <div className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        <Link href="/" className="hover:text-black transition-colors">Collection</Link>
                        <Link href="/products" className="hover:text-black transition-colors">Archive</Link>
                        {isLoggedIn && (
                            <Link href="/dashboard" className="hover:text-black transition-colors text-black underline underline-offset-4">Dashboard</Link>
                        )}
                    </div>

                    {/* AUTH ACTIONS */}
                    <div className="flex items-center pl-8 border-l border-zinc-100">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    {userName || 'Authenticated'}
                                </span>
                                <button
                                    onClick={() => logout()}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] border border-black px-5 py-2 hover:bg-black hover:text-white transition-all"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
                            >
                                Portal Entry
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}