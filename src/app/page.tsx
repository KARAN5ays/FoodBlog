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

      <div className="min-h-screen max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
