import React from 'react';
import Link from 'next/link';
import TrendingWidget from './TrendingWidget';
import TagsWidget from './TagsWidget';
import { PostEdge, HashnodePublication } from '@/lib/hashnode';
import { Github, Twitter, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';

interface SidebarProps {
    posts: PostEdge[];
    publication?: HashnodePublication | null;
}

const Sidebar = ({ posts, publication }: SidebarProps) => {
    const links = publication?.links || {};
    const navbarItems = publication?.preferences?.navbarItems || [];
    const seriesItems = navbarItems.filter((it: any) => it?.type === 'series' && it?.series?.slug);
    const pageItems = navbarItems.filter((it: any) => it?.type === 'page' && it?.page?.slug);

    return (
        <aside className="w-full sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
            {/* About Widget */}
            <div className="bg-surface rounded-3xl p-6 text-center border border-border-custom shadow-sm">
                {publication?.preferences?.logo ? (
                    <img src={publication.preferences.logo} alt={publication.title} className="w-16 h-16 mx-auto mb-4 object-contain rounded-full bg-white/5 p-1 shadow-md" />
                ) : (
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 text-2xl font-bold shadow-md">
                        {publication?.title?.charAt(0) || 'B'}
                    </div>
                )}

                <h5 className="font-extrabold text-lg mb-2 text-foreground">{publication?.displayTitle || publication?.title}</h5>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {publication?.descriptionSEO || 'Read tutorials, guides and project breakdowns.'}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mb-4">
                    {links.twitter && (
                        <a href={links.twitter} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Twitter size={18} /></a>
                    )}
                    {links.github && (
                        <a href={links.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Github size={18} /></a>
                    )}
                    {links.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Linkedin size={18} /></a>
                    )}
                    {links.youtube && (
                        <a href={links.youtube} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Youtube size={18} /></a>
                    )}
                    {links.instagram && (
                        <a href={links.instagram} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Instagram size={18} /></a>
                    )}
                    {links.website && (
                        <a href={links.website} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-foreground transition-all hover:scale-110"><Globe size={18} /></a>
                    )}
                </div>
            </div>

            {(seriesItems.length > 0) && (
                <div className="bg-surface rounded-3xl p-5 border border-border-custom shadow-sm">
                    <h4 className="text-lg font-extrabold mb-4 flex items-center gap-2 text-foreground">
                        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                        Series
                    </h4>
                    <div className="flex flex-col gap-2">
                        {seriesItems.slice(0, 6).map((it: any) => (
                            <Link
                                key={it.id}
                                href={`/series/${it.series.slug}`}
                                className="px-4 py-2 rounded-2xl bg-muted border border-border-custom text-sm font-semibold text-foreground hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:scale-95"
                            >
                                {it.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {(pageItems.length > 0) && (
                <div className="bg-surface rounded-3xl p-5 border border-border-custom shadow-sm">
                    <h4 className="text-lg font-extrabold mb-4 flex items-center gap-2 text-foreground">
                        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                        Pages
                    </h4>
                    <div className="flex flex-col gap-2">
                        {pageItems.slice(0, 6).map((it: any) => (
                            <Link
                                key={it.id}
                                href={`/pages/${it.page.slug}`}
                                className="px-4 py-2 rounded-2xl bg-muted border border-border-custom text-sm font-semibold text-foreground hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:scale-95"
                            >
                                {it.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <TrendingWidget posts={posts} />

            <TagsWidget posts={posts} />
        </aside>
    );
};

export default Sidebar;
