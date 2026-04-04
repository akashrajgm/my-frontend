'use client'

import { useActionState, useEffect } from 'react'
import { register } from '@/app/actions/register' // Matches your actions/register.ts
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()

    // Connects the UI to the Server Action logic
    const [state, formAction, isPending] = useActionState(register, {
        error: "",
        success: false
    })

    // Auto-redirect to login after successful registration
    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => router.push('/login'), 2000)
            return () => clearTimeout(timer)
        }
    }, [state.success, router])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 font-sans">
            <div className="w-full max-w-sm space-y-12">

                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Create Identity</h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Studio Archive / Enrollment</p>
                </header>

                {/* FEEDBACK MESSAGES */}
                {state.error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-sm">
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{state.error}</p>
                    </div>
                )}

                {state.success && (
                    <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-sm">
                        <p className="text-green-500 text-[10px] font-black uppercase tracking-widest text-center">Identity Created. Syncing Portal...</p>
                    </div>
                )}

                <form action={formAction} className="space-y-8">
                    <div className="space-y-6">
                        {/* FULL NAME */}
                        <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Full Name</label>
                            <input name="fullName" type="text" required placeholder="John Doe" className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-700" />
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Email Address</label>
                            <input name="email" type="email" required placeholder="user@example.com" className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-700" />
                        </div>

                        {/* PASSWORD */}
                        <div className="flex flex-col border-b border-zinc-800 pb-2 focus-within:border-white transition-colors">
                            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">Access Key</label>
                            <input name="password" type="password" required placeholder="••••••••" className="bg-transparent outline-none text-white text-sm placeholder:text-zinc-700" />
                        </div>
                    </div>

                    <button
                        disabled={isPending || state.success}
                        className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all disabled:opacity-50"
                    >
                        {isPending ? "Connecting..." : "Initialize Identity"}
                    </button>
                </form>

                <footer className="text-center pt-4">
                    <Link href="/login" className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
                        Already have an identity?
                    </Link>
                </footer>
            </div>
        </div>
    )
}