'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthFormProps {
    onSuccess: (role: string) => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<'customer' | 'vendor'>('customer');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://interior-marketplace-api.onrender.com';
        const endpoint = isLogin ? '/login' : '/register';

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: isLogin ? undefined : role
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', role);
                onSuccess(role);
            } else if (!isLogin) {
                // If they just registered, switch them to login mode
                setIsLogin(true);
                alert("Registration successful. Please sign in.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[420px] mx-auto p-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem]">
            <div className="bg-[#0A0A0A] p-10 rounded-[2.4rem] border border-white/5 shadow-2xl">

                {/* Toggle between Login and Register */}
                <div className="flex gap-6 mb-10 justify-center">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`text-[10px] uppercase tracking-[0.3em] transition-all ${isLogin ? 'text-blue-500 font-bold border-b border-blue-500 pb-1' : 'text-neutral-600'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`text-[10px] uppercase tracking-[0.3em] transition-all ${!isLogin ? 'text-blue-500 font-bold border-b border-blue-500 pb-1' : 'text-neutral-600'}`}
                    >
                        Register
                    </button>
                </div>

                {/* Role Selector (Only shows during Registration) */}
                <AnimatePresence>
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 gap-2 mb-8 p-1 bg-black rounded-2xl border border-white/5"
                        >
                            <button
                                onClick={() => setRole('customer')}
                                className={`py-3 text-[9px] uppercase font-black rounded-xl transition-all ${role === 'customer' ? 'bg-white text-black' : 'text-neutral-600'}`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => setRole('vendor')}
                                className={`py-3 text-[9px] uppercase font-black rounded-xl transition-all ${role === 'vendor' ? 'bg-white text-black' : 'text-neutral-600'}`}
                            >
                                Vendor
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-[0.4em] text-neutral-600 ml-4">Identity</label>
                        <input
                            type="email" placeholder="EMAIL@DOMAIN.COM" required
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[10px] tracking-widest outline-none focus:border-blue-500/50 transition-all text-white"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[8px] uppercase tracking-[0.4em] text-neutral-600 ml-4">Access Key</label>
                        <input
                            type="password" placeholder="••••••••" required
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[10px] tracking-widest outline-none focus:border-blue-500/50 transition-all text-white"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-[9px] uppercase tracking-widest text-center italic mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-white text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all mt-4 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Authorize Entry' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}