'use client'

import Link from 'next/link'
import { logout } from '@/app/actions/logout'

interface NavbarProps {
    isLoggedIn?: boolean;
    role?: string;
}

export default function Navbar({ isLoggedIn, role }: NavbarProps) {
    return (
        <nav className="flex justify-between items-center px-10 py-8 border-b border-zinc-100 bg-white text-black font-sans">
            <Link href="/" className="text-xl font-black uppercase tracking-tighter">
                Studio Archive
            </Link>

            <div className="flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest">
                <Link href="/" className="hover:text-zinc-500 transition-colors">Collection</Link>

                {isLoggedIn ? (
                    <>
                        <Link href="/dashboard" className="hover:text-zinc-500 transition-colors">Archive Access</Link>
                        {role === 'vendor' && (
                            <Link href="/dashboard/my-listings" className="hover:text-zinc-500 transition-colors text-zinc-400">Inventory</Link>
                        )}
                        <button
                            onClick={() => logout()}
                            className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link href="/login" className="bg-black text-white px-6 py-3 hover:bg-zinc-800 transition-all">
                        Enter Portal
                    </Link>
                )}
            </div>
        </nav>
    )
}