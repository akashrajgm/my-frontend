import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { CartProvider } from "@/context/CartContext"; // 1. IMPORT THE BRAIN

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Archive | Architectural Marketplace",
  description: "Curated premium artifacts for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {/* 2. WRAP EVERYTHING IN THE CART PROVIDER */}
        <CartProvider>
          {/* GLOBAL NAVIGATION */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="py-10 border-t border-zinc-900 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">
              © 2026 Studio Archive / Architectural Collective
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}