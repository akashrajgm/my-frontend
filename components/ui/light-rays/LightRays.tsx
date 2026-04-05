'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './LightRays.css';

interface LightRaysProps {
    raysOrigin?: 'top-left' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-center';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin: string, w: number, h: number) => {
    const outside = 0.2;
    switch (origin) {
        case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
        case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
        case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
        case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
        case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
        default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
    }
};

const LightRays: React.FC<LightRaysProps> = ({
    raysOrigin = 'top-center',
    raysColor = '#ffffff',
    raysSpeed = 1,
    lightSpread = 1,
    rayLength = 2,
    pulsating = false,
    fadeDistance = 1.0,
    saturation = 1.0,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0.0,
    distortion = 0.0,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const uniformsRef = useRef<any>(null);
    const animationIdRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
        rendererRef.current = renderer;
        const gl = renderer.gl;

        containerRef.current.appendChild(gl.canvas);

        const program = new Program(gl, {
            vertex: `attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`,
            fragment: `
                precision highp float;
                uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
                uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread;
                uniform float rayLength; uniform float pulsating; uniform float fadeDistance;
                uniform float saturation; uniform vec2 mousePos; uniform float mouseInfluence;
                uniform float distortion; varying vec2 vUv;

                float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
                    vec2 sourceToCoord = coord - raySource;
                    vec2 dirNorm = normalize(sourceToCoord);
                    float cosAngle = dot(dirNorm, rayRefDirection);
                    float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
                    float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
                    float distance = length(sourceToCoord);
                    float maxDist = iResolution.x * rayLength;
                    float falloff = clamp((maxDist - distance) / maxDist, 0.0, 1.0);
                    float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
                    float base = clamp((0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)), 0.0, 1.0);
                    return base * falloff * spreadFactor * pulse;
                }

                void main() {
                    vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
                    vec2 finalDir = rayDir;
                    if (mouseInfluence > 0.0) {
                        vec2 mDir = normalize((mousePos * iResolution.xy) - rayPos);
                        finalDir = normalize(mix(rayDir, mDir, mouseInfluence));
                    }
                    float r1 = rayStrength(rayPos, finalDir, coord, 36.22, 21.11, 1.5 * raysSpeed);
                    float r2 = rayStrength(rayPos, finalDir, coord, 22.39, 18.02, 1.1 * raysSpeed);
                    vec3 color = (r1 * 0.5 + r2 * 0.4) * raysColor;
                    if (saturation != 1.0) {
                        float gray = dot(color, vec3(0.299, 0.587, 0.114));
                        color = mix(vec3(gray), color, saturation);
                    }
                    gl_FragColor = vec4(color, color.r * 0.5);
                }
            `,
            uniforms: {
                iTime: { value: 0 }, iResolution: { value: [0, 0] }, rayPos: { value: [0, 0] },
                rayDir: { value: [0, 0] }, raysColor: { value: hexToRgb(raysColor) },
                raysSpeed: { value: raysSpeed }, lightSpread: { value: lightSpread },
                rayLength: { value: rayLength }, pulsating: { value: pulsating ? 1.0 : 0.0 },
                fadeDistance: { value: fadeDistance }, saturation: { value: saturation },
                mousePos: { value: [0.5, 0.5] }, mouseInfluence: { value: mouseInfluence },
                distortion: { value: distortion }
            }
        });

        uniformsRef.current = program.uniforms;
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        const resize = () => {
            if (!containerRef.current) return;
            const { clientWidth: w, clientHeight: h } = containerRef.current;
            renderer.setSize(w, h);
            program.uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
            const { anchor, dir } = getAnchorAndDir(raysOrigin, w * renderer.dpr, h * renderer.dpr);
            program.uniforms.rayPos.value = anchor;
            program.uniforms.rayDir.value = dir;
        };

        const update = (t: number) => {
            program.uniforms.iTime.value = t * 0.001;
            if (followMouse) {
                smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
                smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;
                program.uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
            }
            renderer.render({ scene: mesh });
            animationIdRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        animationIdRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
        };
    }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, distortion]);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
        };
        if (followMouse) window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [followMouse]);

    return <div ref={containerRef} className={`light-rays-container ${className}`} />;
};

export default LightRays;