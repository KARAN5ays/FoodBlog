import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HashnodePost, HashnodePublication } from '@/lib/hashnode';
import { ArrowRight, Sparkles, Github, Twitter, Linkedin, Instagram, Youtube, Globe, Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface HeroProps {
    publication?: HashnodePublication | null;
    featuredPost?: HashnodePost | null;
}

const Hero = ({ publication, featuredPost }: HeroProps) => {
    const title = publication?.displayTitle || publication?.title || 'Tech Blog';
    const subtitle = publication?.descriptionSEO || 'Exploring technology, programming, and software engineering.';
    const featuredImage = featuredPost?.coverImage?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072';

    const isRemoteImage = typeof featuredImage === 'string' && featuredImage.startsWith('http');

    // Social Links Helper
    const SocialIcon = ({ type, url }: { type: string, url?: string }) => {
        if (!url) return null;
        const iconProps = { size: 20 };
        const icons: { [key: string]: React.ReactNode } = {
            github: <Github {...iconProps} />,
            twitter: <Twitter {...iconProps} />,
            linkedin: <Linkedin {...iconProps} />,
            instagram: <Instagram {...iconProps} />,
            youtube: <Youtube {...iconProps} />,
            website: <Globe {...iconProps} />
        };

        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 border border-border-custom rounded-full hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
            >
                {icons[type] || <Globe {...iconProps} />}
            </a>
        );
    };

    return (
        <div className="relative overflow-hidden bg-background pt-12 pb-24 lg:pt-20 lg:pb-32">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-50/40 to-transparent dark:from-blue-950/10 dark:to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-0 bottom-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content Area */}
                    <div className="lg:w-1/2 flex flex-col gap-8 text-center lg:text-left">

                        {/* Badge */}
                        {publication && (
                            <div className="flex justify-center lg:justify-start">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest shadow-sm">
                                    <Sparkles size={12} className="text-blue-500 animate-pulse" />
                                    <span>{publication.title}</span>
                                </div>
                            </div>
                        )}

                        {/* Headings */}
                        <div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
                                {title}
                            </h1>
                            <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {subtitle}
                            </p>
                        </div>

                        {/* CTA & Socials */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-2">
                            <Link
                                href="/posts"
                                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full transition-all duration-300 shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    Start Reading <ArrowRight size={20} />
                                </span>
                            </Link>

                            {/* Social Links */}
                            {publication?.links && (
                                <div className="flex items-center gap-3">
                                    <SocialIcon type="github" url={publication.links.github} />
                                    <SocialIcon type="twitter" url={publication.links.twitter} />
                                    <SocialIcon type="linkedin" url={publication.links.linkedin} />
                                    <SocialIcon type="youtube" url={publication.links.youtube} />
                                    <SocialIcon type="website" url={publication.links.website} />
                                </div>
                            )}
                        </div>

                        {/* Optional Stats or Tags */}
                        {featuredPost?.tags && (
                            <div className="pt-6 border-t border-border-custom bg-transparent flex flex-wrap justify-center lg:justify-start gap-3">
                                {featuredPost.tags.slice(0, 3).map(tag => (
                                    <span key={tag.name} className="text-sm font-semibold text-text-secondary bg-surface border border-border-custom px-3 py-1 rounded-lg">
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Visual Area */}
                    <div className="lg:w-1/2 w-full perspective-1000">
                        {featuredPost ? (
                            <div className="relative group perspective-1000">
                                {/* Glow Underlay */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-surface">
                                    <Image
                                        src={featuredImage}
                                        alt={featuredPost.title}
                                        fill
                                        unoptimized={isRemoteImage}
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />

                                    {/* Glass Overlay Content */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">

                                        {/* Post Metadata */}
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {formatDate(featuredPost.publishedAt)}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-blue-200/50" />
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {featuredPost.readTimeInMinutes || Math.max(1, Math.ceil((featuredPost.content?.html?.length || 0) / 2000))} min read
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 drop-shadow-md">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            {featuredPost.brief}
                                        </p>

                                        <Link
                                            href={`/posts/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2 px-6 py-2 bg-white text-blue-900 font-bold rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 hover:bg-blue-50"
                                        >
                                            Read Article <ArrowRight size={16} />
                                        </Link>
                                    </div>

                                    {/* Feature Badge */}
                                    <div className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white/10">
                                        Featured
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-border-custom">
                                <p className="text-text-secondary font-medium">No featured post available</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
