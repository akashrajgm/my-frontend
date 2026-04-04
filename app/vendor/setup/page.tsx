'use client'

import React, { useActionState } from 'react'
import { setupVendor } from '@/app/actions/auth' // We'll need to add this action

export default function VendorSetup() {
    // Adding state to handle errors from Tharun's backend
    const [state, formAction, isPending] = useActionState(setupVendor, { error: "" })

    return (
        <div className="min-h-screen bg-white text-black py-20 px-6 font-sans">
            <div className="max-w-xl mx-auto">
                <header className="mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Step 02 / Business Verification</span>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-2 leading-none">Establish Storefront</h1>
                    <p className="text-zinc-500 mt-4 text-sm italic">Connect your professional identity to the Studio Archive marketplace.</p>
                </header>

                {state?.error && (
                    <p className="mb-6 text-[10px] font-bold uppercase text-red-600 bg-red-50 p-4 border border-red-100">
                        {state.error}
                    </p>
                )}

                <form action={formAction} className="space-y-10">
                    <div className="space-y-6">
                        {/* Business Name */}
                        <div className="group border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Business Name</label>
                            <input
                                name="businessName"
                                type="text"
                                required
                                placeholder="e.g. Architectural Elements Ltd."
                                className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-200"
                            />
                        </div>

                        {/* GST / Tax ID */}
                        <div className="group border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">GST / Tax Identification</label>
                            <input
                                name="gstNumber"
                                type="text"
                                required
                                placeholder="Enter 15-digit GSTIN"
                                className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-200"
                            />
                        </div>

                        {/* Physical Location */}
                        <div className="group border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Headquarters Location</label>
                            <input
                                name="location"
                                type="text"
                                required
                                placeholder="City, Country"
                                className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-200"
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            disabled={isPending}
                            className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Verifying..." : "Complete Onboarding"}
                        </button>
                        <p className="text-[10px] text-zinc-400 mt-6 text-center leading-relaxed">
                            By completing this, you agree to the <br />
                            <span className="text-black underline cursor-pointer">Studio Archive Merchant Agreement.</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}