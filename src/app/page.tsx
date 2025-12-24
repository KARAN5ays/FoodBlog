export const revalidate = 60;

import React from 'react';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import NewsletterCTA from '@/components/NewsletterCTA';
import LiveStats from '@/components/LiveStats';
import { getPosts, getPublication } from '@/lib/hashnode';
import { Metadata } from 'next';



export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublication();
  const title = publication?.displayTitle || publication?.title || 'Tech Blog';
  return {
    title: `Home | ${title}`,
    description: publication?.descriptionSEO || 'Discover cutting-edge technology articles, programming tutorials, and engineering insights.',
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [posts, publication] = await Promise.all([
    getPosts(),
    getPublication()
  ]);

  const params = await searchParams;
  // const currentPage = parseInt(params.page as string) || 1;



  const featuredPost = posts[0]?.node || null;

  // Calculate stats from real Hashnode data
  const totalArticles = posts.length;
  const totalViews = publication?.totalDocuments || posts.length; // Use totalDocuments or fallback to post count
  const totalLikes = posts.reduce((acc, post) => acc + (post.node?.reactions?.total || 0), 0);
  const avgReadTime = posts.length > 0
    ? Math.round(posts.reduce((acc, post) => acc + (post.node?.readTimeInMinutes || 0), 0) / posts.length)
    : 0;
  const engagement = posts.length > 0 && totalViews > 0 ? Math.round((totalLikes / totalViews) * 100) : 0;

  return (
    <>
      <Hero publication={publication} featuredPost={featuredPost} />

      {/* All Articles Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ArticleGrid posts={posts} publication={publication} />
      </div>

      {/* Live Stats Section */}
      <div className="py-12 md:py-20 bg-muted border-t border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-sm font-bold tracking-wide">⚡ {publication?.title || 'BLOG'} STATS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground tracking-tight">
              {publication?.displayTitle || publication?.title || 'Publication'} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {publication?.descriptionSEO || 'Track our latest articles, community engagement, and growth.'}
            </p>
          </div>

          <LiveStats
            stats={[
              { label: 'Articles', value: totalArticles.toString(), prefix: '', suffix: '+' },
              { label: 'Total Views', value: totalViews.toString(), prefix: '', suffix: 'K' },
              { label: 'Total Likes', value: totalLikes.toString(), prefix: '', suffix: '+' },
              { label: 'Avg Read Time', value: avgReadTime.toString(), prefix: '', suffix: ' min' },
              { label: 'Engagement', value: engagement.toString(), prefix: '', suffix: '%' },
            ]}
          />
        </div>
      </div>

      <NewsletterCTA publication={publication} />
    </>
  );
}
