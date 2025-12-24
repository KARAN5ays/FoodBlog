import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HashnodePost } from '@/lib/hashnode';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  post: HashnodePost;
  formatDate: (dateString: string) => string;
}

const ArticleCard = ({ post, formatDate }: ArticleCardProps) => {
  if (!post) return null;

  const imageUrl = post.coverImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000';
  const readTime = Math.ceil((post.content?.html?.length || 0) / 1000);
  const publishDate = formatDate(post.publishedAt);
  const firstTag = post.tags?.[0]?.name;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col h-full focus:outline-none"
    >
      <div className="bg-surface rounded-2xl overflow-hidden border border-border-custom transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 hover:-translate-y-1 h-full flex flex-col relative">

        {/* Hover Highlight Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl pointer-events-none transition-colors duration-300" />

        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={imageUrl.startsWith('http')}
          />

          {/* Tag Badge */}
          {firstTag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-700/50 text-foreground text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                {firstTag}
              </span>
            </div>
          )}

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Meta Top */}
          <div className="flex items-center gap-3 text-xs font-medium text-text-secondary mb-2">
            <span className="flex items-center gap-1">
              {publishDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-border-custom" />
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-link transition-colors duration-300">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1 leading-relaxed">
            {post.brief}
          </p>

          {/* Footer / Action */}
          <div className="flex items-center pt-4 border-t border-border-custom mt-auto">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-link group-hover:translate-x-1 transition-transform duration-300">
              Read Article
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
