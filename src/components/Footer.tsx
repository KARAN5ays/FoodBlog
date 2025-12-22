import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-surface text-text-secondary py-12 mt-auto border-t border-border-custom">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
                    <div className="md:col-span-4">
                        <h4 className="text-xl font-bold text-foreground mb-4">
                            Aerawat<span className="text-blue-600">Engineering</span>
                        </h4>
                        <p className="text-sm opacity-80 mb-6 max-w-sm mx-auto md:mx-0">
                            Technology made simple. Articles crafted with expertise. Join our journey to engineering excellence.
                        </p>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h6 className="font-bold text-foreground mb-4">Links</h6>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-sm hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-sm hover:text-blue-600 transition-colors">About</Link></li>
                            <li><Link href="/posts" className="text-sm hover:text-blue-600 transition-colors">All Articles</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h6 className="font-bold text-foreground mb-4">Follow Us</h6>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-border-custom rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 border border-border-custom rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 border border-border-custom rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                        <p className="text-xs opacity-60 mt-8">
                            &copy; {new Date().getFullYear()} Aerawat Engineering. All rights reserved.
                        </p>
                        <p className="text-[10px] opacity-40 mt-2">
                            Last updated: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
