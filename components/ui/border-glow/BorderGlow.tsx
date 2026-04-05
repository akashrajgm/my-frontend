'use client'

import React, { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
    children: React.ReactNode;
    className?: string;
    edgeSensitivity?: number;
    glowColor?: string; // HSL format: "40 80 80"
    backgroundColor?: string;
    borderRadius?: number;
    glowRadius?: number;
    glowIntensity?: number;
    coneSpread?: number;
    animated?: boolean;
    colors?: string[];
    fillOpacity?: number;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
    children,
    className = '',
    edgeSensitivity = 30,
    glowColor = '40 80 80',
    backgroundColor = '#060010',
    borderRadius = 28,
    glowRadius = 40,
    glowIntensity = 1.0,
    coneSpread = 25,
    animated = false,
    colors = ['#c084fc', '#f472b6', '#38bdf8'],
    fillOpacity = 0.5,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const parseHSL = (hslStr: string) => {
        const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
        if (!match) return { h: 40, s: 80, l: 80 };
        return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
    };

    const buildGlowVars = (color: string, intensity: number) => {
        const { h, s, l } = parseHSL(color);
        const base = `${h}deg ${s}% ${l}%`;
        const opacities = [100, 60, 50, 40, 30, 20, 10];
        const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
        const vars: any = {};
        opacities.forEach((op, i) => {
            vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(op * intensity, 100)}%)`;
        });
        return vars;
    };

    const buildGradientVars = (cols: string[]) => {
        const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
        const keys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
        const map = [0, 1, 2, 0, 1, 2, 1];
        const vars: any = {};
        keys.forEach((key, i) => {
            const c = cols[Math.min(map[i], cols.length - 1)];
            vars[key] = `radial-gradient(at ${positions[i]}, ${c} 0px, transparent 50%)`;
        });
        vars['--gradient-base'] = `linear-gradient(${cols[0]} 0 100%)`;
        return vars;
    };

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const dx = x - cx;
        const dy = y - cy;
        const edge = Math.min(Math.max(1 / Math.min(cx / Math.abs(dx), cy / Math.abs(dy)), 0), 1);
        const angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360;

        cardRef.current.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        cardRef.current.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    }, []);

    return (
        <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            className={`border-glow-card ${className}`}
            style={{
                '--card-bg': backgroundColor,
                '--edge-sensitivity': edgeSensitivity,
                '--border-radius': `${borderRadius}px`,
                '--glow-padding': `${glowRadius}px`,
                '--cone-spread': coneSpread,
                '--fill-opacity': fillOpacity,
                ...buildGlowVars(glowColor, glowIntensity),
                ...buildGradientVars(colors),
            } as React.CSSProperties}
        >
            <span className="edge-light" />
            <div className="border-glow-inner">
                {children}
            </div>
        </div>
    );
};

export default BorderGlow;