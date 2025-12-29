import React from 'react';
import Link from 'next/link';
import { getPublication } from '@/lib/hashnode';
import { HASHNODE_DOMAIN } from '@/lib/config';
import { getRelativePath } from '@/lib/utils';

export default async function SitemapPage() {
    const publication = await getPublication();

    const navItems = publication?.preferences?.navbarItems || [];

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl min-h-[60vh]">
            <h1 className="text-4xl md:text-5xl font-black mb-10 text-foreground tracking-tight">
                Sitemap
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400 uppercase tracking-widest text-sm">Main Sections</h2>
                    <ul className="space-y-4">
                        <li><Link href="/" className="text-lg font-medium hover:text-blue-600 transition-colors">Home</Link></li>
                        <li><Link href="/posts" className="text-lg font-medium hover:text-blue-600 transition-colors">Explore Articles</Link></li>
                        <li><Link href="/projects" className="text-lg font-medium hover:text-blue-600 transition-colors">Portfolio Projects</Link></li>
                        <li><Link href="/contacts" className="text-lg font-medium hover:text-blue-600 transition-colors">Contact Information</Link></li>
                        <li><Link href="/subscribe" className="text-lg font-medium hover:text-blue-600 transition-colors">Newsletter Subscription</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400 uppercase tracking-widest text-sm">Publication Pages</h2>
                    <ul className="space-y-4">
                        {navItems.map((item, idx) => {
                            const href = item.url
                                ? getRelativePath(item.url, HASHNODE_DOMAIN)
                                : (item.type === 'series' ? `/series/${item.series?.slug}` : item.type === 'page' ? `/pages/${item.page?.slug}` : '#');

                            return (
                                <li key={idx}>
                                    <Link href={href} className="text-lg font-medium hover:text-purple-600 transition-colors">
                                        {item.label || item.page?.title || item.series?.name}
                                    </Link>
                                </li>
                            );
                        })}
                        <li><Link href="/pages/privacy" className="text-lg font-medium hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/pages/terms" className="text-lg font-medium hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
