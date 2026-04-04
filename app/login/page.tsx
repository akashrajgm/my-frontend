'use client'
import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, { error: "" })

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
            <div className="w-full max-w-sm space-y-10">

                <header className="text-center">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Authorize Entry</h1>
                </header>

                {state?.error && (
                    <div className="bg-red-500/10 border border-red-500 p-4 rounded text-center">
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                            {/* If it's an object, stringify it so we can read it. If it's a string, show it. */}
                            {typeof state.error === 'object' ? JSON.stringify(state.error) : state.error}
                        </p>
                    </div>
                )}

                <form action={formAction} className="space-y-8">
                    <div className="space-y-4">
                        <input name="email" type="email" placeholder="Email" required className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white outline-none focus:border-white transition-all" />
                        <input name="password" type="password" placeholder="Password" required className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white outline-none focus:border-white transition-all" />
                    </div>
                    <button disabled={isPending} className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
                        {isPending ? "Connecting..." : "Initialize Session"}
                    </button>
                </form>
            </div>
        </div>
    )
}