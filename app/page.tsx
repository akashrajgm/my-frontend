'use client'

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import { GlowCard } from "./components/GlowCard";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`)
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center border-b border-white/5">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Interior Marketplace
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Curated premium furniture pieces sourced from top-tier designers.
        </p>
      </section>

      {/* Clean Grid Gallery */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-500 uppercase tracking-widest text-sm">
              Loading Inventory...
            </div>
          ) : (
            items.map((item) => (
              <GlowCard key={item.id} glowColor="blue">
                <div className="h-full flex flex-col">
                  <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image_url}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-6 bg-[#0A0A0A] rounded-b-2xl flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-mono text-blue-400">${item.price}</span>
                      <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 hover:text-white transition">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))
          )}
        </div>
      </section>

      {/* Clean Auth Section */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 italic">Member Access</h2>
            <p className="text-gray-500 text-sm">Log in to manage your orders and favorites.</p>
          </div>
          <AuthForm mode="login" />
        </div>
      </section>

      <footer className="py-10 text-center text-gray-700 text-xs border-t border-white/5">
        © 2026 Interior Marketplace Studio
      </footer>
    </main>
  );
}