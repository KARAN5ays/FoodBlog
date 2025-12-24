'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PostEdge, HashnodePublication } from '@/lib/hashnode';
import { getRelativePath } from '@/lib/utils';
import { HASHNODE_DOMAIN } from '@/lib/config';

interface NavbarProps {
    posts: PostEdge[];
    publication?: HashnodePublication | null;
}

interface NavLink {
    label: string;
    href: string;
    prominent: boolean;
    key?: string;
}

const Navbar = ({ posts, publication }: NavbarProps) => {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);



    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubscribe = () => {
        router.push('/subscribe');
    };

    const navLinks: NavLink[] = [
        { label: 'Home', href: '/', prominent: false },
        { label: 'Projects', href: '/projects', prominent: false },
        { label: 'Explore', href: '/posts', prominent: false },
        ...(publication?.preferences?.navbarItems?.map((item, index) => {
            const normalizedHref = item.url
                ? getRelativePath(item.url, HASHNODE_DOMAIN)
                : (item.type === 'series' ? `/series/${item.series?.slug}` : item.type === 'page' ? `/pages/${item.page?.slug}` : '#');

            return {
                label: item.label || (item.type === 'series' ? item.series?.name : item.page?.title) || item.type,
                href: normalizedHref,
                prominent: false,
                key: `navbar-${item.type}-${item.series?.slug || item.page?.slug || index}`
            };
        }) || []),
    ];

    const isActive = (href: string) => {
        if (!href || href === '#') return false;
        const normalizedHref = getRelativePath(href, HASHNODE_DOMAIN);
        if (normalizedHref === '/') return pathname === '/';
        return pathname.startsWith(normalizedHref);
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled
                ? 'bg-background/80 backdrop-blur-md shadow-sm border-border-custom'
                : 'bg-background/0 border-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="group flex items-center gap-3 text-2xl font-black tracking-tighter mr-8 whitespace-nowrap">
                        {publication?.preferences?.logo ? (
                            <img
                                src={publication.preferences.logo}
                                alt={publication.title || 'Logo'}
                                className="h-10 w-auto object-contain"
                            />
                        ) : (
                            <>
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all">
                                    {publication?.displayTitle || publication?.title || 'Tech Blog'}
                                </span>
                                {(publication?.title?.split(' ').length || 0) > 1 && (
                                    <span className="text-foreground text-lg font-bold opacity-80">
                                        {publication?.title?.split(' ').slice(1).join(' ')}
                                    </span>
                                )}
                            </>
                        )}
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:block flex-grow max-w-sm mr-8">
                        <SearchBar posts={posts} placeholder="Search articles..." />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center gap-1">
                            {/* Dynamic Hashnode Nav Items */}
                            {(publication?.preferences?.navbarItems || []).length > 0 ? (
                                publication?.preferences?.navbarItems?.map((item, index) => {
                                    const href = item.url
                                        ? getRelativePath(item.url, HASHNODE_DOMAIN)
                                        : (item.type === 'series' ? `/series/${item.series?.slug}` : item.type === 'page' ? `/pages/${item.page?.slug}` : '#');

                                    return (
                                        <Link
                                            key={`navbar-${item.type}-${index}`}
                                            href={href}
                                            target={item.type === 'link' && !item.url?.includes(HASHNODE_DOMAIN) ? '_blank' : undefined}
                                            className={`relative px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${isActive(href)
                                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10'
                                                : 'text-text-secondary hover:text-foreground hover:bg-muted/50'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })
                            ) : (
                                // Fallback if no Hashnode items defined
                                <>
                                    <Link href="/" className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-foreground">Home</Link>
                                    <Link href="/projects" className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-foreground">Projects</Link>
                                    <Link href="/posts" className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-foreground">Explore</Link>
                                </>
                            )}


                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-border-custom">
                            {/* Theme toggle */}
                            {mounted && (
                                <button
                                    suppressHydrationWarning
                                    onClick={toggleTheme}
                                    className="p-2.5 rounded-full text-text-secondary hover:bg-muted hover:text-foreground transition-colors"
                                    aria-label="Toggle Theme"
                                >
                                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            )}

                            {mounted && (
                                <button
                                    suppressHydrationWarning
                                    onClick={handleSubscribe}
                                    className="bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:-translate-y-0.5"
                                >
                                    Subscribe
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    {mounted && (
                        <button
                            suppressHydrationWarning
                            className="lg:hidden p-2 text-text-secondary hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-6 animate-slide-up origin-top">
                        <div className="bg-surface border border-border-custom rounded-2xl shadow-xl p-4 flex flex-col gap-4">
                            <div className="py-2">
                                <SearchBar posts={posts} placeholder="Search articles..." />
                            </div>
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.href)
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                            : 'text-text-secondary hover:bg-muted hover:text-foreground'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-border-custom">
                                {mounted && (
                                    <button
                                        onClick={toggleTheme}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border-custom text-text-secondary hover:bg-muted hover:text-foreground font-medium transition-colors"
                                    >
                                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                        {isDark ? 'Light' : 'Dark'}
                                    </button>
                                )}
                                {mounted && (
                                    <button
                                        suppressHydrationWarning
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleSubscribe();
                                        }}
                                        className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
