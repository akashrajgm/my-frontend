'use client'

import { useEffect, useState } from "react";
import { GlowCard } from "./components/GlowCard";

// Define what an Item looks like based on your friend's API docs
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
    // We use the environment variable we just created in terminal
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch from Render:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-blue-500/30">
      {/* Sleek Navbar */}
      <nav className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="text-xl font-bold tracking-tighter uppercase">
          E-COMM <span className="text-gray-500 italic font-light">Interior</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] opacity-30 italic">
          Live API Mode
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">
          Modern <span className="text-gray-500 italic font-light">Spaces</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-16 text-sm tracking-wide">
          Connected to: <span className="text-blue-500 font-mono text-xs">interior-marketplace-api.onrender.com</span>
        </p>

        {/* The Component Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {loading ? (
            // Loading State while waiting for Render
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-500 animate-pulse uppercase tracking-widest text-xs">Syncing Inventory...</p>
            </div>
          ) : items.length > 0 ? (
            // Real Data from your friend's API
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
                    <p className="text-blue-400 font-bold font-mono tracking-tighter text-xl">${item.price}</p>
                  </div>
                </div>
              </GlowCard>
            ))
          ) : (
            // Fallback if no items are returned
            <p className="text-gray-600 italic">No inventory found in database.</p>
          )}
        </div>
      </section>
    </main>
  );
}