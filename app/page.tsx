import { GlowCard } from "./components/GlowCard";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-blue-500/30">
      {/* Sleek Navbar */}
      <nav className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="text-xl font-bold tracking-tighter uppercase">
          E-COMM <span className="text-gray-500 italic font-light">Interior</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] opacity-30">Collection v1.0</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">
          Modern <span className="text-gray-500 italic font-light">Spaces</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-16 text-sm tracking-wide">
          Hover over the gallery to experience our responsive lighting interface.
        </p>

        {/* The Component Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          <GlowCard glowColor="blue">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" className="rounded-xl h-60 object-cover border border-white/5" alt="Living" />
            <div className="text-left mt-6">
              <h3 className="text-2xl font-bold">Living Room</h3>
              <p className="text-gray-500 text-sm mt-1">Minimalist textures.</p>
            </div>
          </GlowCard>

          <GlowCard glowColor="purple">
            <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800" className="rounded-xl h-60 object-cover border border-white/5" alt="Bedroom" />
            <div className="text-left mt-6">
              <h3 className="text-2xl font-bold">Bedroom</h3>
              <p className="text-gray-500 text-sm mt-1">Soft aesthetic tones.</p>
            </div>
          </GlowCard>

          <GlowCard glowColor="orange">
            <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800" className="rounded-xl h-60 object-cover border border-white/5" alt="Kitchen" />
            <div className="text-left mt-6">
              <h3 className="text-2xl font-bold">Kitchen</h3>
              <p className="text-gray-400 text-sm mt-1">Industrial precision.</p>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>
  );
}