'use client'
import { useState } from 'react';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = mode === 'login' ? '/login' : '/register';
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert(`${mode === 'login' ? 'Logged in!' : 'Registered!'} Success.`);
            } else {
                alert('Authentication failed. Check your credentials.');
            }
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-center mb-4 uppercase tracking-tighter">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <input
                type="email" placeholder="Email" required
                className="bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-blue-500 transition"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password" placeholder="Password" required
                className="bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-blue-500 transition"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit" disabled={loading}
                className="bg-white text-black font-bold p-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
                {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
}