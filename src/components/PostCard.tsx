import React from 'react';
import Link from 'next/link';
import { HashnodePost } from '@/lib/hashnode';

interface PostCardProps {
    post: HashnodePost;
    compact?: boolean;
}

const PostCard = ({ post, compact = false }: PostCardProps) => {
    const image = post.coverImage?.url || 'https://via.placeholder.com/800x600?text=No+Image';
    const category = post.tags?.[0]?.name || 'Blog';
    const date = new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    if (compact) {
        return (
            <Link href={`/posts/${post.slug}`} className="group block h-full">
                <div className="h-full bg-surface border border-border-custom rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <div className="relative h-32 overflow-hidden">
                        <img
                            src={image}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={post.title}
                            loading="lazy"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 text-[10px] font-bold rounded-full shadow-sm">
                            {category}
                        </span>
                    </div>

                    <div className="p-3">
                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-1">
                            {date}
                        </p>
                        <h6 className="text-sm font-bold text-foreground line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                            {post.title}
                        </h6>
                        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                            {post.brief || 'Click to read more...'}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className="group relative h-full flex flex-col bg-surface border border-border-custom rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={post.title}
                    loading="lazy"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                    {category}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-widest mb-2">
                    {date}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-6 line-clamp-3 leading-relaxed">
                    {post.brief && post.brief.length > 80 ? post.brief.substring(0, 80) + '...' : (post.brief || '')}
                </p>

                <div className="mt-auto pt-4 border-t border-border-custom flex items-center justify-between">
                    <Link
                        href={`/posts/${post.slug}`}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                    >
                        Read More
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            </div>

            {/* Stretched link for better UX */}
            <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-0" aria-hidden="true" />
        </div>
    );
};

export default PostCard;
