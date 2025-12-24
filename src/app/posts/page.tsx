export const revalidate = 60;


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getPublication } from '@/lib/hashnode';
import { Metadata } from 'next';
import { ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
    const publication = await getPublication();
    const title = publication?.displayTitle || publication?.title || 'Tech Blog';
    return {
        title: `All Articles | ${title}`,
        description: publication?.descriptionSEO || 'Browse all our technology articles - from programming tutorials to engineering insights and tech innovations.',
    };
}

export default async function AllPosts() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-12 md:py-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            All Articles
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            Explore our complete collection of {posts.length} technology articles and programming tutorials.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        Back to Home
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading articles...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((edge) => {
                            const post = edge.node;
                            const readTime = Math.ceil((post.content?.html?.length || 0) / 1000);
                            const isRemoteImage = post.coverImage?.url?.startsWith('http');

                            return (
                                <Link
                                    key={post.slug}
                                    href={`/posts/${post.slug}`}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Cover Image */}
                                    <div className="aspect-video relative overflow-hidden">
                                        {post.coverImage?.url ? (
                                            <Image
                                                src={post.coverImage.url}
                                                alt={post.title}
                                                fill
                                                unoptimized={isRemoteImage}
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <div className="text-white text-6xl font-bold">
                                                    {post.title.charAt(0)}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category/Tag */}
                                        {post.tags?.[0] && (
                                            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium mb-3">
                                                {post.tags[0].name}
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        {/* Description */}
                                        {post.brief && (
                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {post.brief}
                                            </p>
                                        )}

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {formatDate(post.publishedAt)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {readTime} min read
                                            </div>
                                        </div>

                                        {/* Read More */}
                                        <div className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                                            <span>Read More</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
