export const revalidate = 60;


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getPublication } from '@/lib/hashnode';
import { Metadata } from 'next';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';

export async function generateMetadata(): Promise<Metadata> {
    const publication = await getPublication();
    const title = publication?.displayTitle || publication?.title || 'Tech Blog';
    return {
        title: `All Articles | ${title}`,
        description: publication?.descriptionSEO || 'Browse all our technology articles - from programming tutorials to engineering insights and tech innovations.',
    };
}

export default async function AllPosts({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const afterCursor = typeof params.after === 'string' ? params.after : undefined;

    // Fetch 12 posts per page (matches grid layout 3x4)
    const { edges: posts, pageInfo } = await getPosts(12, afterCursor);

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
                            Explore our complete collection of technology articles and programming tutorials.
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
                        <div className="p-8">
                            <p className="text-gray-600 dark:text-gray-400 font-medium text-lg mb-4">No articles found.</p>
                            <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-bold">Return to First Page</Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((edge, index) => (
                                <ArticleCard
                                    key={edge.node?.slug || index}
                                    post={edge.node}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                            {afterCursor && (
                                <Link
                                    href="/posts"
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                >
                                    <ChevronLeft size={18} />
                                    First Page
                                </Link>
                            )}

                            {pageInfo.hasNextPage && pageInfo.endCursor && (
                                <Link
                                    href={`/posts?after=${pageInfo.endCursor}`}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
                                >
                                    Next Page
                                    <ArrowRight size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
