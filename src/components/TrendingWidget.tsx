import React from 'react';
import Link from 'next/link';
import { PostEdge } from '@/lib/hashnode';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface TrendingProps {
    posts: PostEdge[];
}

const TrendingWidget = ({ posts = [] }: TrendingProps) => {
    const latest = posts.slice(0, 5).map(edge => edge.node);

    if (latest.length === 0) return null;

    return (
        <div className="bg-surface rounded-3xl p-6 border border-border-custom hover:border-blue-400 dark:hover:border-blue-700 transition-colors shadow-sm">
            <h4 className="text-lg font-extrabold mb-5 flex items-center gap-2 text-foreground">
                <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                Latest Posts
            </h4>
            <div className="space-y-4">
                {posts.slice(0, 5).map((edge, index) => (
                    <Link
                        key={edge.node.slug}
                        href={`/posts/${edge.node.slug}`}
                        className="group flex items-start gap-4 p-2 -mx-2 rounded-2xl hover:bg-muted transition-all duration-300"
                    >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border-custom shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow">
                            <Image
                                src={edge.node.coverImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'}
                                alt={edge.node.title}
                                fill
                                unoptimized={edge.node.coverImage?.url?.startsWith('http') || false}
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="64px"
                            />
                        </div>
                        <div className="flex-1 min-w-0 py-0.5">
                            <h5 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                {edge.node.title}
                            </h5>
                            <p className="text-[11px] font-semibold text-text-secondary mt-1.5 uppercase tracking-wide">
                                {formatDate(edge.node.publishedAt)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TrendingWidget;
