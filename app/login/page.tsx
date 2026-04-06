'use client'

import React, { useEffect } from 'react'
import { useActionState } from 'react'
import { login, AuthState } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const initialState: AuthState = { error: "" }

    // Using useActionState for the React 19 / Next.js 15 handshake
    const [state, formAction, isPending] = useActionState(login, initialState)

    // THE TOKEN BRIDGE: 
    // This watches for the token from the server, saves it locally, then moves the user.
    useEffect(() => {
        if (state.token) {
            // Secure the key for the Cart Handshake
            localStorage.setItem('token', state.token);

            // Move to the Archive Home
            router.push('/');
            router.refresh();
        }
    }, [state.token, router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 font-sans">
            <div className="w-full max-w-sm space-y-12">

                {/* LOGO & HEADER */}
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                        Authorize Entry
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                        Studio Archive / Access Portal
                    </p>
                </header>

                {/* ERROR NOTIFICATION */}
                {state.error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-4">
                        <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center leading-relaxed">
                            {state.error}
                        </p>
                    </div>
                )}

                {/* LOGIN FORM */}
                <form action={formAction} className="space-y-8">
                    <div className="space-y-6">
                        {/* EMAIL / IDENTITY */}
                        <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Identity / Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="user@example.com"
                                className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-700"
                            />
                        </div>

                        {/* PASSWORD / ACCESS KEY */}
                        <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Access Key</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <button
                            disabled={isPending}
                            className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Verifying Identity..." : "Initialize Session"}
                        </button>

                        {/* REGISTRATION BRIDGE */}
                        <div className="pt-8 border-t border-zinc-900 flex flex-col items-center gap-4">
                            <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">
                                New to the Archive?
                            </p>

                            <div className="flex gap-6">
                                <Link
                                    href="/register"
                                    className="text-white text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-all"
                                >
                                    Register
                                </Link>

                                <span className="text-zinc-800">/</span>

                                <Link
                                    href="/register?type=vendor"
                                    className="text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                                >
                                    Become a Vendor
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}