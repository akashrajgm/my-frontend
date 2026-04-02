'use client'
import React, { useEffect, useRef } from 'react';

export const GlowCard = ({ children }: { children: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const move = (e: PointerEvent) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                cardRef.current.style.setProperty('--x', (e.clientX - rect.left).toFixed(2));
                cardRef.current.style.setProperty('--y', (e.clientY - rect.top).toFixed(2));
            }
        };
        window.addEventListener('pointermove', move);
        return () => window.removeEventListener('pointermove', move);
    }, []);

    return (
        <div ref={cardRef} className="relative group rounded-[2rem] border border-white/5 bg-[#050505] overflow-hidden p-[1px] h-full shadow-2xl">
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(400px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(59, 130, 246, 0.1), transparent 80%)`
                }}
            />
            <div className="relative z-10 h-full w-full rounded-[1.9rem] overflow-hidden">
                {children}
            </div>
        </div>
    );
};