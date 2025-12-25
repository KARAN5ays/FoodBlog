'use client';

import React from 'react';

export const ArticleCardSkeleton = () => {
    return (
        <div className="bg-surface rounded-2xl overflow-hidden border border-border-custom h-full flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-full aspect-video bg-muted" />

            {/* Content Skeleton */}
            <div className="flex flex-col flex-1 p-5 space-y-3">
                {/* Meta */}
                <div className="flex items-center gap-3">
                    <div className="h-3 w-20 bg-muted rounded" />
                    <div className="w-1 h-1 rounded-full bg-muted" />
                    <div className="h-3 w-24 bg-muted rounded" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-full bg-muted rounded" />
                    <div className="h-5 w-3/4 bg-muted rounded" />
                </div>

                {/* Description */}
                <div className="space-y-2 flex-1">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                </div>

                {/* Footer */}
                <div className="flex items-center pt-4 border-t border-border-custom mt-auto">
                    <div className="h-4 w-28 bg-muted rounded" />
                </div>
            </div>
        </div>
    );
};

export const ArticleGridSkeleton = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
            ))}
        </div>
    );
};

export const LearningPathsSkeleton = () => {
    return (
        <section className="w-full py-20 bg-[#f8fafc] dark:bg-[#0d1117] border-t border-border-custom">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
                    <div>
                        <div className="h-6 w-40 bg-muted rounded-full mb-4 animate-pulse" />
                        <div className="h-10 w-64 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-96 bg-muted rounded mt-4 md:mt-0 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-2xl animate-pulse">
                            <div className="mb-4 h-3 w-48 bg-muted rounded" />
                            <div className="h-7 w-full bg-muted rounded mb-3" />
                            <div className="space-y-2 mb-8">
                                <div className="h-4 w-full bg-muted rounded" />
                                <div className="h-4 w-3/4 bg-muted rounded" />
                            </div>
                            <div className="h-5 w-32 bg-muted rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const HeroSkeleton = () => {
    return (
        <section className="relative w-full overflow-hidden border-b border-border-custom bg-surface">
            <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
                    <div className="flex-1 max-w-3xl space-y-6 animate-pulse">
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="space-y-3">
                            <div className="h-12 w-full bg-muted rounded" />
                            <div className="h-12 w-3/4 bg-muted rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-6 w-full bg-muted rounded" />
                            <div className="h-6 w-5/6 bg-muted rounded" />
                        </div>
                        <div className="flex gap-4">
                            <div className="h-12 w-40 bg-muted rounded" />
                            <div className="h-12 w-40 bg-muted rounded" />
                        </div>
                    </div>
                    <div className="hidden lg:block w-full max-w-md">
                        <div className="h-96 bg-muted rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArticleCardSkeleton;
