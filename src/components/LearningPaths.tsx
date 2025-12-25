import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';

interface Series {
    id: string;
    name: string;
    slug: string;
    description?: {
        html?: string;
    };
    coverImage?: string;
    posts: {
        totalDocuments: number;
    };
}

interface LearningPathsProps {
    series: Series[];
}

const LearningPaths = ({ series }: LearningPathsProps) => {
    if (!series || series.length === 0) return null;

    return (
        <section className="w-full py-20 bg-[#f8fafc] dark:bg-[#0d1117] border-t border-border-custom relative overflow-hidden">
            {/* Subtle light mode pattern/matte finish */}
            <div className="absolute inset-0 opacity-[0.03] dark:hidden pointer-events-none"
                style={{ backgroundImage: "var(--bg-grid-light)", backgroundSize: "30px 30px" }} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold mb-4">
                            <BookOpen size={14} />
                            LEARNING_PATHS
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                            Curated Series
                        </h2>
                    </div>
                    <p className="text-text-secondary max-w-md mt-4 md:mt-0 text-sm md:text-right">
                        Follow structured paths to master specific technologies.
                        <br />From zero to hero, step by step.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {series.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/series/${item.slug}`}
                            className="group relative flex flex-col h-full bg-surface border border-border-custom hover:border-blue-500 transition-all duration-300 p-6 sm:p-8 overflow-hidden rounded-2xl"
                        >
                            {/* Blurred Background Image */}
                            {item.coverImage && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={item.coverImage}
                                        alt=""
                                        fill
                                        className="object-cover blur-lg opacity-50 dark:opacity-60 scale-110 transition-transform duration-500 group-hover:scale-125"
                                        unoptimized={item.coverImage.startsWith('http')}
                                    />
                                    {/* Overlay for better text contrast */}
                                    <div className="absolute inset-0 bg-white/20 dark:bg-[#0d1117]/40 z-[1]" />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Lesson Count - Monospace */}
                                <div className="mb-4 text-xs font-mono font-bold text-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                                    TRACK_{String(index + 1).padStart(2, '0')}: {item.posts.totalDocuments} ARTICLES
                                </div>

                                {/* Series Name */}
                                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.name}
                                </h3>

                                {/* Description (Optional, clamped) */}
                                <div
                                    className="text-sm text-text-secondary mb-8 line-clamp-3 leading-relaxed flex-grow"
                                    dangerouslySetInnerHTML={{ __html: item.description?.html || '' }}
                                />

                                {/* Start Track Button */}
                                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-500 group-hover:translate-x-1 transition-transform mt-auto">
                                    START TRACK
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningPaths;
