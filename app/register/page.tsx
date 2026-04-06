'use client'

import React, { useActionState, useEffect, Suspense } from 'react'
import { register, RegisterState } from '@/app/actions/register' // This points to your action file
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

// This sub-component handles the search params logic
function RegisterForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const type = searchParams.get('type') || 'customer'

    const initialState: RegisterState = { error: "", success: false }
    const [state, formAction, isPending] = useActionState(register, initialState)

    useEffect(() => {
        if (state.success) {
            toast.success("Account Created. Please Sign In.")
            router.push('/login')
        }
    }, [state.success, router])

    return (
        <div className="w-full max-w-sm space-y-12">
            <header className="text-center">
                <h1 className="text-2xl font-black uppercase tracking-tighter text-white italic">
                    {type === 'vendor' ? 'Vendor Onboarding' : 'New Member Registration'}
                </h1>
            </header>

            {state.error && (
                <div className="bg-red-500/10 border border-red-500/50 p-4">
                    <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center">
                        {state.error}
                    </p>
                </div>
            )}

            <form action={formAction} className="space-y-8">
                <div className="space-y-6">
                    <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                        <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            placeholder="archive_user"
                            className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-800"
                        />
                    </div>

                    <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                        <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="vault@studio.com"
                            className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-800"
                        />
                    </div>

                    <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                        <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-800"
                        />
                    </div>
                </div>

                <button
                    disabled={isPending}
                    className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                    {isPending ? "Initializing Profile..." : "Create Account"}
                </button>
            </form>
        </div>
    )
}

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
            <Suspense fallback={<p className="text-white font-mono text-[10px] animate-pulse">LOADING ARCHIVE...</p>}>
                <RegisterForm />
            </Suspense>
        </main>
    )
}