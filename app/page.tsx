'use client'

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
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
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Full-Screen Hero */}
      <section className="relative h-screen flex items-center px-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover img-reveal"
            alt="Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="text-blue-500 font-mono text-xs tracking-[0.6em] uppercase mb-6 animate-pulse">Established 2026</p>
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8">
            PURE <br /> <span className="text-gray-700 italic">FORM.</span>
          </h1>
          <p className="text-gray-500 max-w-md text-lg font-light leading-relaxed mb-10">
            A curated ecosystem for architectural-grade artifacts. We don't sell furniture; we distribute intent.
          </p>
          <div className="flex gap-6 items-center">
            <div className="h-[1px] w-20 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section id="gallery" className="py-32 px-10">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-4xl font-bold tracking-tighter uppercase italic">The Collection</h2>
          <p className="text-gray-600 text-xs uppercase tracking-widest">Showing {items.length || 0} Artifacts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [1, 2, 3, 4].map(n => <div key={n} className="h-96 bg-white/5 rounded-3xl animate-pulse" />)
          ) : (
            items.map((item, index) => (
              <GlowCard key={item.id} glowColor={index % 2 === 0 ? 'blue' : 'purple'}>
                <div className="h-full flex flex-col group cursor-crosshair">
                  <div className="relative flex-grow overflow-hidden">
                    <img
                      src={item.image_url}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={item.name}
                    />
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] border border-white/10">
                      ${item.price}
                    </div>
                  </div>
                  <div className="p-6 bg-[#0A0A0A] border-t border-white/5">
                    <h3 className="text-lg font-bold tracking-tight uppercase italic">{item.name}</h3>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">{item.description || 'Limited Edition'}</p>
                  </div>
                </div>
              </GlowCard>
            ))
          )}
        </div>
      </section>

      {/* Industrial Footer */}
      <footer className="py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-left">
          <p className="text-xs font-bold tracking-tighter mb-2">Interior Marketplace</p>
          <p className="text-[10px] text-gray-600">System Version 4.02 // Production Build</p>
        </div>
        <div className="flex gap-10">
          {['Instagram', 'Twitter', 'LinkedIn'].map(link => (
            <span key={link} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer transition">{link}</span>
          ))}
        </div>
      </footer>
    </main>
  );
}