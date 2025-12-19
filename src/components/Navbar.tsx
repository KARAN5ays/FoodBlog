'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PostEdge } from '@/lib/hashnode';

interface NavbarProps {
    posts: PostEdge[];
}

const Navbar = ({ posts }: NavbarProps) => {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSubscribe = () => {
        router.push('/subscribe');
    };

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'All Articles', href: '/posts' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className={`sticky top-0 z-50 w-full backdrop-blur-md border-b border-border-custom transition-all duration-300 ${isDark ? 'bg-background/80' : 'bg-white/80'} shadow-sm`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="text-2xl font-bold tracking-tight mr-8 whitespace-nowrap">
                        Aerawat<span className="text-blue-600">Engineering</span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:block flex-grow max-w-sm mr-8">
                        <SearchBar posts={posts} placeholder="Search articles..." />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${isActive(link.href) ? 'text-blue-600' : 'text-text-secondary'
                                        }`}
                                >
                                    {link.label}
                                    {isActive(link.href) && (
                                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border-custom transition-all duration-300 hover:border-blue-500/50 ${isDark ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-slate-700 hover:bg-slate-100'
                                }`}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                            <span className="text-xs font-semibold uppercase tracking-wider">
                                {isDark ? 'Light' : 'Dark'}
                            </span>
                        </button>

                        <button
                            onClick={handleSubscribe}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-text-secondary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col gap-4">
                            <div className="py-2">
                                <SearchBar posts={posts} placeholder="Search articles..." />
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-3 py-2 text-lg font-medium ${isActive(link.href) ? 'text-blue-600' : 'text-text-secondary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-border-custom">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 text-text-secondary font-medium"
                                >
                                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                    {isDark ? 'Light Mode' : 'Dark Mode'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        handleSubscribe();
                                    }}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
