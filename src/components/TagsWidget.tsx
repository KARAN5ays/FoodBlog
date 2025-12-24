'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { PostEdge } from '@/lib/hashnode';

interface TagsWidgetProps {
    posts: PostEdge[];
}

const TagsWidget = ({ posts = [] }: TagsWidgetProps) => {
    // Extract tags
    const tags = useMemo(() => {
        const tagMap = new Map<string, number>();
        posts.forEach(({ node }) => {
            (node.tags || []).forEach(tag => {
                if (!tag || !tag.name) return;
                tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + 1);
            });
        });

        return Array.from(tagMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15) // Limit to top 15 tags
            .map(t => t[0]);
    }, [posts]);

    if (tags.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            <h4 className="text-lg font-extrabold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-1 h-6 bg-gray-900 dark:bg-white rounded-full"></span>
                Popular Topics
            </h4>
            <div className="flex flex-wrap gap-2">
                {tags.slice(0, 12).map((tag) => (
                    <Link
                        key={tag}
                        href={`/posts?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagsWidget;
