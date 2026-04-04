import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";
import { Toaster } from "sonner"; // 1. IMPORT THE NOTIFICATION ENGINE (OPS-2)

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
        {/* RAZORPAY SCRIPT (PAY-3) */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <CartProvider>
          {/* 2. GLOBAL NOTIFICATIONS (OPS-2) */}
          <Toaster
            position="top-center"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                border: '1px solid #1a1a1a',
                color: '#fff',
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }
            }}
          />

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