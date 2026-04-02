export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
            <div className="font-bold tracking-tighter text-xl uppercase">
                E-COMM <span className="text-gray-500 italic font-light">Interior</span>
            </div>
            <div className="flex gap-6 items-center">
                <button className="text-xs font-bold hover:text-blue-400 transition uppercase tracking-widest">Collection</button>
                <button className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold hover:bg-blue-500 hover:text-white transition uppercase tracking-widest">
                    Join Portal
                </button>
            </div>
        </nav>
    );
}