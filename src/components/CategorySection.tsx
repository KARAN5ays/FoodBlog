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
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Explore Our Articles
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Discover technology articles, programming tutorials, and engineering insights from our latest publications.
                    </p>
                </div>

                {/* Category Pills */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {Array.from(categories.entries()).map(([key, config]) => {
                            const isSelected = selectedCategory === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${isSelected
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-surface border-border-custom text-text-secondary hover:border-blue-500/50 hover:-translate-y-0.5 shadow-sm'
                                        }`}
                                >
                                    {config.displayName}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                            <h4 className="text-xl font-bold text-text-secondary mb-2">No articles found in this category</h4>
                            <p className="text-text-secondary">Try selecting a different category or search for something else.</p>
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
