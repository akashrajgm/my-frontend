'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  // NEW: Search State for CAT-3
  const [searchQuery, setSearchQuery] = useState('');

  const MOCK_DATA = [
    { id: 1, name: 'Eames Lounge', price: 4500, category: 'SEATING', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80' },
    { id: 2, name: 'Panton S-Chair', price: 1200, category: 'SEATING', image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80' },
    { id: 3, name: 'Noguchi Table', price: 1800, category: 'TABLES', image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80' },
    { id: 4, name: 'Wassily Chair', price: 3100, category: 'SEATING', image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80' },
    { id: 5, name: 'Arco Lamp', price: 2400, category: 'LIGHTING', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80' },
    { id: 6, name: 'Platform Bed', price: 5200, category: 'ARCHIVE', image_url: 'https://images.unsplash.com/photo-1505693419148-ad3035ce6163?q=80' },
  ];

  useEffect(() => {
    setMounted(true);
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://interior-marketplace-api.onrender.com';

    fetch(`${baseUrl}/items`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setItems(Array.isArray(data) ? data : MOCK_DATA))
      .catch(() => setItems(MOCK_DATA));
  }, []);

  if (!mounted) return null;

  const categories = ['ALL', 'SEATING', 'TABLES', 'LIGHTING', 'ARCHIVE'];

  // UPDATED: Multi-filter Logic (Category + Search)
  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30">
      {/* Passing the search handler to the Navbar */}
      <Navbar onSearch={(val: string) => setSearchQuery(val)} />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center px-6 md:px-20 pt-24 border-b border-white/5 overflow-hidden">
        <div className="absolute right-0 top-0 w-2/3 h-full opacity-30 grayscale pointer-events-none">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-[10px] font-bold tracking-[0.8em] text-[#D4AF37] uppercase mb-4 block">New Collection 2026</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            STUDIO <br /> <span className="text-neutral-800 italic font-light">ARCHIVE.</span>
          </h1>
        </motion.div>
      </section>

      {/* Category Navigation */}
      <nav className="sticky top-20 z-[80] bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 text-[10px] uppercase tracking-[0.4em] transition-all rounded-full border
                ${activeCategory === cat
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-black'
                  : 'border-white/10 text-neutral-500 hover:text-white hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Storefront Product Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={item.id}
                className="group cursor-pointer"
              >
                <GlowCard>
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-sm">
                    <div className="absolute top-6 left-6 z-10 bg-white text-black px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      Limited Release
                    </div>

                    <img
                      src={item.image_url}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      alt={item.name}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                      <button className="w-full bg-[#D4AF37] text-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors shadow-2xl">
                        Add to Collection
                      </button>
                    </div>
                  </div>
                </GlowCard>

                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold tracking-tighter uppercase italic leading-none mb-2">{item.name}</h3>
                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-mono text-neutral-400 italic">${item.price}</span>
                    <p className="text-[8px] text-[#D4AF37] font-black uppercase mt-1">Authentic</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-32 border-t border-white/5 text-center mt-20 bg-gradient-to-t from-white/[0.02] to-transparent">
        <p className="text-[9px] text-neutral-800 uppercase tracking-[1.5em] mb-4">Architecture // Design // Commerce</p>
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">© 2026 Archive Global Supply</p>
      </footer>
    </main>
  );
}