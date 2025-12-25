'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostEdge, HashnodePublication } from '@/lib/hashnode';
import ArticleCard from './ArticleCard';
import TrendingWidget from './TrendingWidget';

interface ArticleGridProps {
  posts: PostEdge[];
  publication?: HashnodePublication | null;
}

const POSTS_PER_PAGE = 6;

const ArticleGrid = ({ posts, publication }: ArticleGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        posts.flatMap((edge: PostEdge) =>
          edge.node?.tags?.map((tag: any) => tag?.name).filter(Boolean) || []
        )
      )
    ).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((edge) =>
      edge.node?.tags?.some((tag: any) => tag?.name === selectedCategory)
    );
  }, [posts, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setVisibleCount(POSTS_PER_PAGE); // Reset pagination on filter change
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">Filter by Topic</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect(null)}
              suppressHydrationWarning
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === null
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-2 ring-offset-background'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-foreground border border-transparent'
                }`}
            >
              All Articles
            </button>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                suppressHydrationWarning
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-2 ring-offset-background'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-foreground border border-transparent'
                  }`}
              >
                {cat}
              </button>
            ))}
            {categories.length > 8 && (
              <button
                suppressHydrationWarning
                className="px-5 py-2.5 rounded-full text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent"
              >
                +{categories.length - 8} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Articles Grid - Full Width 3 columns */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border-custom">
          <p className="text-text-secondary font-medium">No articles found in this category.</p>
          <button
            onClick={() => handleCategorySelect(null)}
            suppressHydrationWarning
            className="mt-4 px-6 py-2 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((edge: PostEdge, index: number) => (
              <ArticleCard
                key={edge.node?.slug || index}
                post={edge.node}
                formatDate={formatDate}
              />
            ))}
          </div>

          {/* Load More Pagination */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={handleLoadMore}
                suppressHydrationWarning
                className="px-8 py-3 bg-muted border border-border-custom hover:border-blue-500 text-foreground font-bold rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      )}

      {/* Latest Posts Section Below Grid */}
      <div className="mt-16 pt-12 border-t border-border-custom">
        <TrendingWidget posts={posts} />
      </div>
    </div>
  );
};

export default ArticleGrid;
