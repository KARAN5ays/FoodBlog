'use client';

import React, { useState, useMemo } from 'react';
import PostCard from './PostCard';
import { PostEdge } from '@/lib/hashnode';

interface CategoryConfig {
    displayName: string;
    color: string;
}

interface CategorySectionProps {
    posts: PostEdge[];
}

const CategorySection = ({ posts }: CategorySectionProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories from all posts
    const categories = useMemo(() => {
        const categoryMap = new Map<string, CategoryConfig>();
        categoryMap.set('All', { displayName: 'All Articles', color: '#3b82f6' }); // Blue-500

        posts.forEach(edge => {
            if (edge?.node?.tags) {
                edge.node.tags.forEach(tag => {
                    if (tag?.name && !categoryMap.has(tag.name)) {
                        categoryMap.set(tag.name, {
                            displayName: tag.name,
                            color: '#3b82f6'
                        });
                    }
                });
            }
        });

        return categoryMap;
    }, [posts]);

    // Filter posts by selected category
    const filteredPosts = useMemo(() => {
        if (selectedCategory === 'All') return posts;

        return posts.filter(edge => {
            if (!edge?.node?.tags) return false;
            return edge.node.tags.some(tag => tag?.name === selectedCategory);
        });
    }, [posts, selectedCategory]);

    return (
        <section className="py-12">
            <div className="w-full">
                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                        Explore Articles
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Discover technology articles, programming tutorials, and engineering insights.
                    </p>
                </div>

                {/* Category Pills */}
                <div className="mb-12">
                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(categories.entries()).slice(0, 9).map(([key, config]) => {
                            const isSelected = selectedCategory === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key)}
                                    suppressHydrationWarning={true}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border backdrop-blur-md ${isSelected
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                                        : 'bg-white/50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
                                        }`}
                                >
                                    {config.displayName}
                                </button>
                            );
                        })}
                        {categories.size > 9 && (
                            <button
                                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-muted text-text-secondary hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-border-custom"
                            >
                                +{categories.size - 9} more
                            </button>
                        )}
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((edge, index) => {
                            if (!edge || !edge.node) return null;
                            const { node } = edge;
                            return (
                                <div
                                    key={node.slug}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <PostCard post={node} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found in this category</h4>
                            <p className="text-gray-600 dark:text-gray-400">Try selecting a different category or search for something else.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section>
    );
};

export default CategorySection;
