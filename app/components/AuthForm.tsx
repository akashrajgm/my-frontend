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
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // Tip: Some backends expect 'username' instead of 'email'
                body: JSON.stringify({
                    username: email,
                    email: email,
                    password: password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Success:", result);
                alert(`${mode.toUpperCase()} Success! Check console for token.`);
            } else {
                console.error("Server Error:", result);
                alert(`Error: ${result.detail || 'Check console'}`);
            }
        } catch (error) {
            console.error('Connection Refused:', error);
            alert('Cannot reach the Render server. Is it awake?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[450px] mx-auto p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full p-10 bg-[#0A0A0A] rounded-[2.4rem] border border-white/5 shadow-2xl">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">
                        {mode}
                    </h2>
                    <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-2">Interior Marketplace Access</p>
                </div>

                <input
                    type="email" placeholder="Email Address" required
                    className="bg-black border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password" placeholder="Password" required
                    className="bg-black border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit" disabled={loading}
                    className="bg-white text-black font-black py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 uppercase text-xs tracking-widest"
                >
                    {loading ? 'Authenticating...' : `Execute ${mode}`}
                </button>
            </form>
        </div>
    );
}