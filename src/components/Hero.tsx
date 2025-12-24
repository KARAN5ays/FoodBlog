import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HashnodePost, HashnodePublication } from '@/lib/hashnode';
import { ArrowRight, Sparkles, Code2, Terminal, Cpu } from 'lucide-react';

interface HeroProps {
    publication?: HashnodePublication | null;
    featuredPost?: HashnodePost | null;
}

const Hero = ({ publication, featuredPost }: HeroProps) => {
    const title = publication?.displayTitle || publication?.title || 'Tech Blog';
    const subtitle = publication?.descriptionSEO || 'Exploring technology, programming, and software engineering.';
    const featuredImage = featuredPost?.coverImage?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072';

    // Split title for styling if needed, or use as is
    const titleParts = title.split(' ');
    const mainTitle = titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(' ');
    const subTitle = titleParts.slice(Math.ceil(titleParts.length / 2)).join(' ');

    const isRemoteImage = typeof featuredImage === 'string' && featuredImage.startsWith('http');

    return (
        <div className="relative overflow-hidden bg-background pt-10 pb-20 lg:pt-16 lg:pb-28">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        {publication && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider shadow-sm animate-fade-in">
                                <Sparkles size={14} className="animate-pulse" />
                                <span>{publication.title}</span>
                            </div>
                        )}

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-foreground">
                            {mainTitle} <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {subTitle}
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/posts"
                                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    Start Reading <ArrowRight size={18} />
                                </span>
                            </Link>

                        </div>

                        {/* Dynamic Tags from Featured Post */}
                        {featuredPost?.tags && featuredPost.tags.length > 0 && (
                            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                {featuredPost.tags.slice(0, 3).map(tag => (
                                    <div key={tag.name} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-sm font-bold text-blue-600 dark:text-blue-300 shadow-sm">
                                        <span className="text-lg">#</span>
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Visual / Featured Content */}
                    <div className="lg:w-1/2 w-full relative perspective-1000">
                        {featuredPost ? (
                            <div className="relative group perspective-1000">
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-surface shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01] group-hover:rotate-1">
                                    <Image
                                        src={featuredImage}
                                        alt={featuredPost.title}
                                        fill
                                        unoptimized={isRemoteImage}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />

                                    {/* Live Badge for Featured too if desired, or keep Featured */}
                                    <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        <Sparkles size={12} className="text-yellow-300" />
                                        Featured Post
                                    </div>

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2 leading-tight drop-shadow-md">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-gray-200 line-clamp-2 text-sm md:text-base mb-5 opacity-90 max-w-md">
                                            {featuredPost.brief}
                                        </p>
                                        <Link
                                            href={`/posts/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                                        >
                                            Read Article <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Fallback Live Image if no featured post */
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-surface shadow-2xl transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-1 group">
                                <div className="absolute inset-0 bg-blue-600/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                <Image
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                                    alt="Developer Workspace"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                {/* Live Badge */}
                                <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                    Live Preview
                                </div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                        Building the Future
                                    </h2>
                                    <p className="text-gray-200 text-sm md:text-base opacity-90">
                                        Exploring the latest in web development, system architecture, and tech innovation.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
