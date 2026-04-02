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
    <main className="min-h-screen bg-black text-white selection:bg-blue-500">
      <Navbar />

      {/* Modern Hero Section */}
      <section className="pt-48 pb-24 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
          INTERIOR <br /> <span className="text-gray-600 italic">MARKETPLACE</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light">
          A high-fidelity marketplace for premium architectural artifacts and curated designer furniture.
        </p>
      </section>

      {/* Grid Gallery */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Loading Live Inventory</p>
            </div>
          ) : (
            items.map((item) => (
              <GlowCard key={item.id} glowColor="blue">
                <div className="h-full flex flex-col group">
                  <div className="relative h-72 w-full overflow-hidden">
                    <img
                      src={item.image_url}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-8 bg-[#0A0A0A] flex-grow flex flex-col justify-between border-t border-white/5">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase italic">{item.name}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-8">
                      <span className="text-2xl font-black tracking-tighter text-blue-500">${item.price}</span>
                      <button className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black hover:bg-blue-500 hover:text-white transition-all uppercase">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))
          )}
        </div>
      </section>

      {/* Secure Member Portal */}
      <section className="py-32 px-6 bg-[#030303] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-6 italic uppercase">Member <br /> Access.</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Enter your credentials to synchronize your architectural projects and track active marketplace acquisitions.
            </p>
          </div>
          <div className="relative">
            {/* Visual anchor for the form */}
            <div className="absolute -inset-10 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
            <AuthForm mode="login" />
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-[10px] text-gray-700 tracking-[0.8em] uppercase">Interior Marketplace Studio // 2026</p>
      </footer>
    </main>
  );
}