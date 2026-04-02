'use client'
import React, { useEffect, useRef } from 'react';

export const GlowCard = ({ children, glowColor = 'blue' }: any) => {
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

    const colors: any = { blue: '220', purple: '280', orange: '30' };

    return (
        <div ref={cardRef} className="w-full h-[500px] relative group rounded-[2.5rem] border border-white/10 bg-[#0A0A0A] overflow-hidden p-[1px] shadow-2xl hover:border-white/20 transition-colors duration-500">
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(400px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), hsl(${colors[glowColor]} 80% 60% / 0.12), transparent 80%)`
                }}
            />
            <div className="relative z-10 h-full w-full bg-[#0A0A0A] rounded-[2.4rem] overflow-hidden">
                {children}
            </div>
        </div>
    );
};