'use client'

import { useActionState } from 'react'
import { login, AuthState } from '@/app/actions/auth'

export default function LoginPage() {
    // 1. Define the initial state matching the AuthState type
    const initialState: AuthState = { error: "" }

    // 2. Pass the types to the hook: <State, Payload>
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 font-sans">
            <div className="w-full max-w-sm space-y-12">

                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                        Authorize Entry
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                        Studio Archive / Access Portal
                    </p>
                </header>

                {/* ERROR DISPLAY */}
                {state.error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-sm">
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
                            {state.error}
                        </p>
                    </div>
                )}

                <form action={formAction} className="space-y-8">
                    <div className="space-y-6">
                        {/* EMAIL */}
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

                        {/* PASSWORD */}
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

                    <button
                        disabled={isPending}
                        className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all disabled:opacity-50"
                    >
                        {isPending ? "Verifying Identity..." : "Initialize Session"}
                    </button>
                </form>
            </div>
        </div>
    )
}