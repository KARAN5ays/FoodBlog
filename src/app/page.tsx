export const revalidate = 60;

import React from 'react';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import NewsletterCTA from '@/components/NewsletterCTA';
import LiveStats from '@/components/LiveStats';
import LearningPaths from '@/components/LearningPaths';
import { getPosts, getPublication, getSeriesList } from '@/lib/hashnode';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublication();
  const title = publication?.displayTitle || publication?.title || 'Tech Blog';
  const description = publication?.descriptionSEO || 'Discover cutting-edge technology articles, programming tutorials, and engineering insights.';
  const siteUrl = publication?.url || 'https://it-blog-livid.vercel.app';
  const logo = publication?.preferences?.logo;
  const favicon = publication?.favicon;

  // Safely construct URL for metadataBase
  let metadataBase;
  try {
    metadataBase = new URL(siteUrl);
  } catch {
    // Fallback to default if URL is invalid
    metadataBase = new URL('https://it-blog-livid.vercel.app');
  }

  return {
    title: `Home | ${title}`,
    description,
    keywords: ['tech blog', 'programming', 'software engineering', 'tutorials', 'web development', 'coding'],
    authors: publication?.author?.name ? [{ name: publication.author.name }] : undefined,
    creator: publication?.author?.name,
    publisher: title,
    metadataBase,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: title,
      title: `Home | ${title}`,
      description,
      images: logo ? [
        {
          url: logo,
          width: 1200,
          height: 630,
          alt: `${title} Logo`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Home | ${title}`,
      description,
      creator: publication?.links?.twitter ? `@${publication.links.twitter.split('/').pop()}` : undefined,
      images: logo ? [logo] : [],
    },
    icons: {
      icon: favicon || logo || '/favicon.ico',
      apple: favicon || logo || '/apple-touch-icon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [postsData, publication, seriesList] = await Promise.all([
    getPosts(10), // Fetch initial posts for home
    getPublication(),
    getSeriesList(4) // Fetch top 4 series
  ]);

  const posts = postsData.edges;
  const featuredPost = posts[0]?.node || null;

  // Calculate stats from real Hashnode data
  const totalArticles = postsData.totalDocuments;
  const totalLikes = posts.reduce((acc, post) => acc + (post.node?.reactions?.total || 0), 0);
  const avgReadTime = posts.length > 0
    ? Math.round(posts.reduce((acc, post) => acc + (post.node?.readTimeInMinutes || 0), 0) / posts.length)
    : 0;

  return (
    <>
      {publication && <Hero publication={publication} featuredPost={featuredPost} />}

      {/* All Articles Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ArticleGrid posts={posts} publication={publication} />
      </div>

      {/* Learning Paths Section */}
      <LearningPaths series={seriesList} />

      {/* Live Stats Section */}
      <div className="py-12 md:py-20 bg-muted border-t border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-sm font-bold tracking-wide">⚡ {publication?.title || 'BLOG'} STATS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground tracking-tight">
              {publication?.displayTitle || publication?.title || 'Publication'} Insights
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {publication?.descriptionSEO || 'Track our latest articles, community engagement, and growth.'}
            </p>
          </div>

          <LiveStats
            stats={[
              { label: 'Articles', value: totalArticles.toString(), prefix: '', suffix: '+' },
              { label: 'Total Likes', value: totalLikes.toString(), prefix: '', suffix: '+' },
              { label: 'Avg Read Time', value: avgReadTime.toString(), prefix: '', suffix: ' min' },
            ]}
          />
        </div>
      </div>

      <NewsletterCTA publication={publication} />
    </>
  );
}
