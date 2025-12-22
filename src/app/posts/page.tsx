export const revalidate = 60;


import React from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/hashnode';
import { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'All Articles | Aerawat Engineering',
    description: 'Browse all our technology articles - from programming tutorials to engineering insights and tech innovations.',
};

export default async function AllPosts() {
    const posts = await getPosts();

    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-20">
                {/* Professional Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            All Articles
                        </h1>
                        <p className="text-text-secondary max-w-xl">
                            Explore our complete collection of {posts.length} technology articles and programming tutorials.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border-custom bg-surface text-text-secondary font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                    >
                        <ChevronLeft size={18} />
                        Back to Home
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-surface rounded-3xl border border-border-custom shadow-sm">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-text-secondary font-medium">Loading articles...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom duration-700">
                        {posts.map((edge) => (
                            <div key={edge.node.slug}>
                                <PostCard post={edge.node} compact={true} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
