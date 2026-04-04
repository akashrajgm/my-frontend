import React from 'react'

export default function VendorSetup() {
    return (
        <div className="min-h-screen bg-white text-black py-20 px-6">
            <div className="max-w-xl mx-auto">
                {/* Header Section */}
                <header className="mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Step 02 / Business Verification</span>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mt-2">Establish Storefront</h1>
                    <p className="text-zinc-500 mt-2 text-sm italic">Connect your professional identity to the Studio Archive marketplace.</p>
                </header>

                {/* The Form */}
                <form className="space-y-10">
                    <div className="space-y-6">
                        {/* Business Name */}
                        <div className="group border-b border-zinc-200 py-2 focus-within:border-black transition-colors">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Business Name</label>
                            <input
                                name="businessName"
                                type="text"
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
                                placeholder="City, Country"
                                className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-200"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <button className="w-full bg-black text-white py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">
                            Complete Onboarding
                        </button>
                        <p className="text-[10px] text-zinc-400 mt-4 text-center">
                            By completing this, you agree to the Studio Archive Merchant Agreement.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}