export const revalidate = 120;

import React from 'react';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import NewsletterCTA from '@/components/NewsletterCTA';
import Pagination from '@/components/Pagination';
import { getPosts } from '@/lib/hashnode';
import { Metadata } from 'next';

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: 'Home | Aerawat Engineering',
  description: 'Discover cutting-edge technology articles, programming tutorials, and engineering insights.',
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const posts = await getPosts();
  const params = await searchParams;
  const currentPage = parseInt(params.page as string) || 1;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <Hero />

      <div className="min-h-[50vh] max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">No posts found</h2>
            <p className="text-text-secondary max-w-md">
              We couldn't find any articles at the moment. Please check back later or try refreshing the page.
            </p>
            <a
              href="/"
              className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </a>
          </div>
        ) : (
          <>
            <CategorySection posts={currentPosts} />

            <div className="container mx-auto px-4 pb-20">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>

      <NewsletterCTA />
    </>
  );
}
