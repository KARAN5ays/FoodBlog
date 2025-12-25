'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Youtube, Instagram, Globe, Rss, FileText, Terminal, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { HashnodePublication } from '@/lib/hashnode';

interface FooterProps {
  publication?: HashnodePublication | null;
}

const Footer = ({ publication }: FooterProps) => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send this to your newsletter service
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const links = publication?.links || {};
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <footer className="glass-panel border-t border-border-custom mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Resources / Navigation Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600 rounded-full"></span>
              Menu
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-3 text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-border-custom flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                    <FileText size={14} />
                  </div>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="group flex items-center gap-3 text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-border-custom flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                    <Terminal size={14} />
                  </div>
                  Explore
                </Link>
              </li>
              {publication?.preferences?.navbarItems?.slice(0, 4).map((item, idx) => {
                const getHref = () => {
                  if (item.type === 'series' && item.series?.slug) {
                    return `/series/${item.series.slug}`;
                  }
                  if (item.type === 'page' && item.page?.slug) {
                    return `/pages/${item.page.slug}`;
                  }
                  // Handle manual links (e.g. "About" or "All Articles") that might point to the deployed domain
                  if (item.url) {
                    try {
                      // If the link uses the publication's domain, treat it as internal (relative)
                      if (publication?.url) {
                        const itemUrl = new URL(item.url);
                        const pubUrl = new URL(publication.url);
                        if (itemUrl.origin === pubUrl.origin) {
                          return itemUrl.pathname;
                        }
                      }
                    } catch (e) {
                      // Invalid URL, fall through
                    }
                    return item.url;
                  }
                  return '#';
                };

                const href = getHref();
                const isInternal = href.startsWith('/');

                return (
                  <li key={idx}>
                    <Link
                      href={href}
                      // Only open external links in new tab
                      target={!isInternal ? '_blank' : undefined}
                      className="group flex items-center gap-3 text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-border-custom flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                        <Rss size={14} />
                      </div>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-purple-600 rounded-full"></span>
              Connect
            </h3>
            <div className="space-y-4">
              {links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                  Twitter
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Github size={18} className="group-hover:scale-110 transition-transform" />
                  GitHub
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                  LinkedIn
                </a>
              )}
              {links.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Globe size={18} className="group-hover:scale-110 transition-transform" />
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-green-500 rounded-full"></span>
              Newsletter
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Get the latest updates directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-md" suppressHydrationWarning>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border border-border-custom rounded-xl bg-surface/50 backdrop-blur-sm focus:bg-surface text-foreground placeholder-text-secondary outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                  required
                  suppressHydrationWarning
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all text-sm"
                suppressHydrationWarning
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe Free'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {publication?.title?.charAt(0) || 'B'}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {publication?.displayTitle || publication?.title || 'Blog'}
              </span>
              <span className="text-text-secondary mx-2">|</span>
              <span className="text-sm text-text-secondary" suppressHydrationWarning>© {mounted ? currentYear : ''}</span>
            </div>

            <div className="flex gap-8 text-sm font-medium">
              <Link href="/privacy" className="text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
