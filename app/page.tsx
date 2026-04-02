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
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Hero Section: Extreme Typography */}
      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto text-center">
        <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block animate-reveal">
          Premium Artifacts // 2026
        </span>
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-8 animate-reveal [line-height:0.8]">
          CURATED <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic">VIBES.</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-lg font-light leading-relaxed animate-reveal [animation-delay:200ms]">
          A high-fidelity marketplace for those who treat interior design as an engineering discipline.
        </p>
      </section>

      {/* The Bento Gallery */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {loading ? (
            <div className="col-span-12 py-20 text-center animate-pulse text-gray-700 tracking-widest uppercase text-xs">
              Syncing High-Resolution Data...
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className={`${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} animate-reveal`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GlowCard glowColor={index % 2 === 0 ? 'blue' : 'purple'}>
                  <div className="relative group overflow-hidden rounded-xl h-full flex flex-col justify-between">
                    <img
                      src={item.image_url}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="relative p-6 mt-auto">
                      <span className="text-[10px] text-blue-400 font-mono mb-2 block tracking-widest">ID: 00{index + 1}</span>
                      <h3 className="text-3xl font-bold tracking-tighter">{item.name}</h3>
                      <p className="text-white/40 text-sm mt-2 line-clamp-1 italic">{item.description}</p>
                      <div className="mt-6 flex justify-between items-end">
                        <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-blue-500 hover:text-white transition-colors uppercase italic">Acquire</button>
                        <span className="text-2xl font-black tracking-tighter">${item.price}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Senior Level Auth Section */}
      <section className="mt-40 px-6 max-w-4xl mx-auto">
        <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4 italic">The Forge.</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Join our exclusive network to unlock custom build-to-order furniture and early access drops.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs opacity-50">01</div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs opacity-50">02</div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs opacity-50">03</div>
              </div>
            </div>
            <AuthForm mode="login" />
          </div>
        </div>
      </section>
    </main>
  );
}