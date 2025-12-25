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
        <section className="w-full py-24 bg-background border-b border-border relative overflow-hidden">
            {/* Engineering Grid Pattern - Technical feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-mono font-bold mb-4 tracking-widest uppercase">
                            <BookOpen size={12} />
                            Learning_Tracks
                        </div>
                        <h2 className="text-4xl font-black text-foreground tracking-tighter">
                            Curated Series
                        </h2>
                    </div>
                    <p className="text-text-secondary max-w-xs mt-4 md:mt-0 text-sm font-medium leading-relaxed md:text-right">
                        Structured roadmaps designed to take you from core concepts to production-ready engineering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {series.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/series/${item.slug}`}
                            className="group flex flex-col h-full bg-surface shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl"
                        >
                            {/* Card Image Section (Top) */}
                            <div className="relative w-full h-48 overflow-hidden">
                                {item.coverImage ? (
                                    <Image
                                        src={item.coverImage}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        unoptimized={item.coverImage.startsWith('http')}
                                    />
                                ) : (
                                    // Fallback placeholder if no image
                                    <div className="w-full h-full bg-blue-50/50 dark:bg-blue-900/10 flex items-center justify-center">
                                        <BookOpen className="text-blue-200 dark:text-blue-800" size={48} />
                                    </div>
                                )}
                            </div>

                            {/* Card Content Section (Bottom) */}
                            <div className="flex flex-col flex-grow p-6">
                                {/* Track Counter Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800 tracking-wider">
                                        TRACK_{String(index + 1).padStart(2, '0')}
                                    </div>
                                    <span className="text-[11px] font-bold text-text-secondary opacity-80">
                                        {item.posts.totalDocuments} ARTICLES
                                    </span>
                                </div>

                                {/* Series Name */}
                                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.name}
                                </h3>

                                {/* Description */}
                                <div
                                    className="text-sm text-text-secondary mb-6 line-clamp-3 leading-relaxed flex-grow font-medium"
                                    dangerouslySetInnerHTML={{ __html: item.description?.html || '' }}
                                />

                                {/* Action Footer */}
                                <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-foreground/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <span>Start Learning</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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