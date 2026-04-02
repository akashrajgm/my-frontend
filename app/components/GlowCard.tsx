'use client'
import React, { useEffect, useRef } from 'react';

export const GlowCard = ({ children, glowColor = 'blue' }: { children: React.ReactNode, glowColor?: 'blue' | 'purple' | 'orange' }) => {
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

    const colors: Record<string, string> = { blue: '220', purple: '280', orange: '30' };

    return (
        <div ref={cardRef} className="w-80 h-[450px] relative group rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden p-1 shadow-2xl">
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(300px 300px at calc(var(--x) * 1px) calc(var(--y) * 1px), hsl(${colors[glowColor]} 80% 60% / 0.15), transparent 80%)`
                }}
            />
            <div className="relative z-10 h-full w-full bg-[#0A0A0A] rounded-[22px] p-6 text-white flex flex-col justify-between">
                {children}
            </div>
        </div>
    );
};