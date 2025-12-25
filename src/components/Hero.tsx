'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Terminal, Clock, Calendar, Github, Twitter, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';
import { HashnodePublication, HashnodePost } from '@/lib/hashnode';

interface HeroProps {
    publication: HashnodePublication;
    featuredPost?: HashnodePost;
}

const Hero = ({ publication, featuredPost }: HeroProps) => {
    const socialLinks = [
        { icon: Github, url: publication.links?.github, label: 'GitHub' },
        { icon: Twitter, url: publication.links?.twitter, label: 'Twitter' },
        { icon: Linkedin, url: publication.links?.linkedin, label: 'LinkedIn' },
        { icon: Youtube, url: publication.links?.youtube, label: 'YouTube' },
        { icon: Instagram, url: publication.links?.instagram, label: 'Instagram' },
        { icon: Globe, url: publication.links?.website, label: 'Website' },
    ].filter(link => link.url);

    return (
        <section
            className="relative w-full overflow-hidden border-b border-border-custom"
            style={{ backgroundColor: 'var(--bg-surface)' }}
        >

            {/* Technical Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: "var(--bg-grid-light)",
                    backgroundSize: "40px 40px"
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none hidden dark:block"
                style={{
                    backgroundImage: "var(--bg-grid-dark)",
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

                    {/* Left Column: Documentation/Dashboard Style */}
                    <div className="flex-1 max-w-3xl">
                        {/* Status Label */}
                        <div className="inline-flex items-center gap-2 mb-8 font-mono text-xs font-bold tracking-wider text-[#0969da] uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0969da] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0969da]"></span>
                            </span>
                            [ STATUS: ACTIVE ]
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                            {publication.displayTitle || publication.title || "Engineering Blog"}
                        </h1>

                        {/* Subheading - Controlled Width */}
                        <div className="max-w-2xl">
                            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10">
                                {publication.descriptionSEO || "Documenting the journey through software architecture, scaling systems, and modern web development."}
                            </p>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <Link
                                href="/posts"
                                className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold text-white transition-all bg-[#0969da] hover:bg-[#085bb5] rounded-[4px]"
                            >
                                Start Reading
                                <ArrowUpRight className="ml-2 w-4 h-4" />
                            </Link>

                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold text-text-secondary transition-all bg-transparent border border-border-custom hover:border-text-secondary hover:text-foreground rounded-[4px]"
                            >
                                <Terminal className="mr-2 w-4 h-4" />
                                View Projects
                            </Link>
                        </div>

                        {/* Social Links - Technical Row */}
                        {socialLinks.length > 0 && (
                            <div className="flex items-center gap-6 pt-8 border-t border-dashed border-border-custom">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-secondary hover:text-[#0969da] transition-colors"
                                        aria-label={link.label}
                                    >
                                        <link.icon size={20} strokeWidth={2} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Featured "Deployment" Card */}
                    {featuredPost && (
                        <div className="hidden lg:block w-full max-w-md">
                            <div className="bg-surface border border-border-custom p-1 rounded-[4px] shadow-sm">
                                {/* Fake Browser/Terminal Header */}
                                <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border-custom rounded-t-[2px]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                                    </div>
                                    <div className="text-[10px] font-mono text-text-secondary">latest_deployment.mdx</div>
                                </div>

                                {/* Card Content */}
                                <div className="p-0">
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                        {featuredPost.coverImage?.url && (
                                            <Image
                                                src={featuredPost.coverImage.url}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex gap-2 mb-3">
                                            {featuredPost.tags?.slice(0, 2).map(tag => (
                                                <span key={tag.name} className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#0969da] bg-blue-50 dark:bg-blue-900/20 rounded-[2px] border border-blue-100 dark:border-blue-900">
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight mb-2 hover:text-[#0969da] transition-colors">
                                            <Link href={`/posts/${featuredPost.slug}`}>
                                                {featuredPost.title}
                                            </Link>
                                        </h3>
                                        <div className="flex items-center gap-4 mt-4 text-xs font-mono text-text-secondary">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(featuredPost.publishedAt).toLocaleDateString()}
                                            </span>
                                            {featuredPost.readTimeInMinutes && (
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {featuredPost.readTimeInMinutes} min read
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Hero;
