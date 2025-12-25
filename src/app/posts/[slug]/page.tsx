import React from 'react';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/hashnode';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { Calendar, Clock, ChevronLeft, Folder } from 'lucide-react';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import InteractionButtons from '@/components/InteractionButtons';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Aerawat Engineering`,
        description: post.brief,
        openGraph: {
            images: post.coverImage ? [post.coverImage.url] : [],
        },
    };
}

export default async function PostDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const { edges: posts } = await getPosts(10);

    if (!post) {
        notFound();
    }

    const readingTime = calculateReadingTime(post.content?.html || '');

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    <article>
                        {/* Breadcrumb / Back Link */}
                        <Link
                            href="/posts"
                            className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 mb-8 transition-colors group"
                        >
                            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            Back to All Articles
                        </Link>

                        <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border-custom overflow-hidden">
                            {/* Header Content */}
                            <div className="p-8 md:p-12 text-center relative">
                                {/* Tag / Category Badge */}
                                {post.tags?.[0] && (
                                    <div className="flex justify-center mb-6">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-bold shadow-lg shadow-blue-500/20">
                                            <Folder size={14} />
                                            {post.tags[0].name}
                                        </span>
                                    </div>
                                )}

                                <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:via-blue-100 dark:to-slate-200 bg-clip-text text-transparent">
                                    {post.title}
                                </h1>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-text-secondary mt-8">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                                        <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                                            <span className="font-bold text-[10px]">{post.author.name.charAt(0)}</span>
                                        </div>
                                        <span className="font-bold text-foreground">{post.author.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-600" />
                                        <span>{formatDate(post.publishedAt)}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-blue-600" />
                                        <span>{readingTime} min read</span>
                                    </div>
                                </div>
                            </div>

                            {/* Cover Image */}
                            {post.coverImage && (
                                <div className="px-8 md:px-12">
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border-8 border-muted shadow-inner">
                                        <img
                                            src={post.coverImage.url}
                                            className="w-full h-full object-cover"
                                            alt={post.title}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="p-8 md:p-16">
                                <div
                                    className="article-content max-w-none prose dark:prose-invert prose-blue"
                                    dangerouslySetInnerHTML={{ __html: post.content?.html || '' }}
                                />

                                {/* Interaction Buttons */}
                                <div className="mt-12 flex justify-center">
                                    <InteractionButtons postSlug={post.slug} />
                                </div>

                                <div className="mt-16 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <img src={post.author.profilePicture} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-blue-600" />
                                        <div>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Published By</p>
                                            <p className="font-bold text-foreground">{post.author.name}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href="/posts"
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-all active:scale-95"
                                    >
                                        Explore More Articles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Sidebar posts={posts} />
                </div>
            </div>
        </div>
    );
}
