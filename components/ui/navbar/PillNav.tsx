'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Next.js 15 Link
import { gsap } from 'gsap';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { logout } from '@/app/actions/logout';
import './PillNav.css';

interface NavItem {
    label: string | React.ReactNode;
    href: string;
}

const PillNav = ({
    isLoggedIn,
    userName,
    onSearch
}: {
    isLoggedIn?: boolean;
    userName?: string;
    onSearch?: (val: string) => void
}) => {
    const { cart } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const circleRefs = useRef<HTMLSpanElement[]>([]);
    const tlRefs = useRef<gsap.core.Timeline[]>([]);
    const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
    const navContainerRef = useRef(null);

    // Navigation Items
    const items: NavItem[] = [
        { label: 'Collection', href: '/' },
        { label: 'Archive', href: '/dashboard' },
    ];

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle, index) => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                gsap.set(circle, {
                    width: D, height: D, bottom: -delta,
                    xPercent: -50, scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector('.pill-label');
                const hoverLabel = pill.querySelector('.pill-label-hover');

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, duration: 0.6, ease: "power2.out" }, 0);
                if (label) tl.to(label, { y: -(h + 8), duration: 0.4 }, 0);
                if (hoverLabel) tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.4 }, 0);

                tlRefs.current[index] = tl;
            });
        };

        layout();
        window.addEventListener('resize', layout);
        return () => window.removeEventListener('resize', layout);
    }, [items.length]);

    const handleEnter = (i: number) => tlRefs.current[i]?.play();
    const handleLeave = (i: number) => tlRefs.current[i]?.reverse();

    return (
        <div className="pill-nav-fixed-wrapper" ref={navContainerRef}>
            <nav className="pill-nav-main">

                {/* LOGO PILL */}
                <Link href="/" className="pill-logo-circle">
                    <span className="text-[10px] font-black tracking-tighter">SA</span>
                </Link>

                {/* LINKS PILL CONTAINER */}
                <div className="pill-nav-items">
                    <ul className="pill-list">
                        {items.map((item, i) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="pill"
                                    onMouseEnter={() => handleEnter(i)}
                                    onMouseLeave={() => handleLeave(i)}
                                >
                                    <span className="hover-circle" ref={el => { if (el) circleRefs.current[i] = el; }} />
                                    <span className="label-stack">
                                        <span className="pill-label">{item.label}</span>
                                        <span className="pill-label-hover">{item.label}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SEARCH PILL */}
                <div className={`pill-search-container ${isSearchOpen ? 'is-open' : ''}`}>
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="pill-icon-btn">
                        <Search className="w-4 h-4" />
                    </button>
                    {isSearchOpen && (
                        <input
                            type="text"
                            autoFocus
                            placeholder="SEARCH ARCHIVE..."
                            onChange={(e) => onSearch?.(e.target.value)}
                            className="pill-search-input"
                        />
                    )}
                </div>

                {/* ACTIONS PILL */}
                <div className="pill-actions">
                    <button className="pill-icon-btn relative">
                        <ShoppingBag className="w-4 h-4" />
                        {cart.length > 0 && <span className="pill-badge">{cart.length}</span>}
                    </button>

                    {isLoggedIn ? (
                        <button onClick={() => logout()} className="pill-icon-btn text-red-500">
                            <LogOut className="w-4 h-4" />
                        </button>
                    ) : (
                        <Link href="/login" className="pill-icon-btn">
                            <User className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default PillNav;