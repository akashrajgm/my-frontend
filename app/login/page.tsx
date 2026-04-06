'use client'

import React, { useState, useEffect, useActionState } from 'react'
import { login, AuthState } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const [view, setView] = useState<'signin' | 'register'>('signin')
    const router = useRouter()
    const initialState: AuthState = { error: "" }
    const [state, formAction, isPending] = useActionState(login, initialState)

    useEffect(() => {
        if (state.token) {
            localStorage.setItem('token', state.token);
            router.push('/');
            router.refresh();
        }
    }, [state.token, router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
            <div className="w-full max-w-sm space-y-10">

                {/* TAB TOGGLE */}
                <div className="flex justify-center gap-8 border-b border-zinc-900 pb-4">
                    <button
                        onClick={() => setView('signin')}
                        className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${view === 'signin' ? 'text-white' : 'text-zinc-600'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setView('register')}
                        className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${view === 'register' ? 'text-white' : 'text-zinc-600'}`}
                    >
                        Register
                    </button>
                </div>

                {view === 'signin' ? (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {state.error && (
                            <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center">{state.error}</p>
                        )}
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-col border-b border-zinc-800 pb-2">
                                    <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Email</label>
                                    <input name="email" type="email" required className="bg-transparent outline-none text-white text-sm" />
                                </div>
                                <div className="flex flex-col border-b border-zinc-800 pb-2">
                                    <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Password</label>
                                    <input name="password" type="password" required className="bg-transparent outline-none text-white text-sm" />
                                </div>
                            </div>
                            <button disabled={isPending} className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all">
                                {isPending ? "Verifying..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-4">
                            <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Select your archive role</p>
                            <div className="grid gap-4">
                                <Link
                                    href="/register?type=customer"
                                    className="w-full border border-zinc-800 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all text-center"
                                >
                                    Join as Customer
                                </Link>
                                <Link
                                    href="/register?type=vendor"
                                    className="w-full border border-zinc-800 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:border-white hover:text-white transition-all text-center"
                                >
                                    Become a Vendor
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}