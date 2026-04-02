'use client'

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import { GlowCard } from "./components/GlowCard";

interface InteriorItem {
  id: string | number;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
}

export default function Home() {
  const [items, setItems] = useState<InteriorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">
          Modern <span className="text-gray-500 italic font-light">Spaces</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-16 text-sm tracking-wide">
          Hover over the gallery to experience our responsive lighting interface.
        </p>

        {/* Gallery Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {loading ? (
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-500 animate-pulse text-xs uppercase tracking-widest">Syncing Inventory...</p>
            </div>
          ) : (
            items.map((item) => (
              <GlowCard key={item.id} glowColor="blue">
                <img
                  src={item.image_url || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800"}
                  className="rounded-xl h-60 object-cover border border-white/5"
                  alt={item.name}
                />
                <div className="text-left mt-6">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-500 text-sm italic">{item.description || "Collection 2026"}</p>
                    <p className="text-blue-400 font-bold font-mono text-xl">${item.price}</p>
                  </div>
                </div>
              </GlowCard>
            ))
          )}
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth" className="py-32 px-6 flex flex-col items-center border-t border-white/5 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="grid md:grid-cols-2 gap-20 w-full max-w-5xl">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold tracking-tighter mb-6 underline decoration-blue-500/50">
              Access the <br /><span className="text-gray-500 italic">Member Portal</span>
            </h2>
            <p className="text-gray-400">
              Connect your account to save your favorite pieces and track your interior design orders in real-time.
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-blue-500 font-bold">Secure Login</p>
              <AuthForm mode="login" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-purple-500 font-bold">New Member</p>
              <AuthForm mode="register" />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-20 text-[10px] uppercase tracking-[0.5em]">
        © 2026 E-Comm Interior Design Studio
      </footer>
    </main>
  );
}