import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSeries, getPublication } from '@/lib/hashnode';
import ArticleCard from '@/components/ArticleCard';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [series, publication] = await Promise.all([
    getSeries(slug),
    getPublication()
  ]);

  if (!series) {
    return {
      title: 'Series Not Found',
      description: 'The requested series could not be found.',
    };
  }

  return {
    title: `${series.name} | ${publication?.title || 'Blog'}`,
    description: series.description?.markdown || `Articles in the ${series.name} series`,
  };
}

export default async function Series({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [series, publication] = await Promise.all([
    getSeries(slug),
    getPublication()
  ]);

  if (!series) {
    notFound();
  }

  const posts = series.posts?.edges || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Cover Image */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Blurred Cover Image Background */}
        {series.coverImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={series.coverImage}
              alt={series.name}
              fill
              className="object-cover blur-2xl scale-110"
              unoptimized={series.coverImage.startsWith('http')}
              priority
            />
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-purple-900/70" />
          </div>
        )}

        {/* Fallback gradient if no cover image */}
        {!series.coverImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        )}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-sm font-bold uppercase tracking-wider">Series</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg">
              {series.name}
            </h1>
            {series.description?.html && (
              <div
                className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
                dangerouslySetInnerHTML={{ __html: series.description.html }}
              />
            )}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span className="font-bold">{posts.length}</span>
                <span>Articles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Articles in This Series</h2>
            <p className="text-text-secondary text-lg">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} published in this series
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-3xl border border-border-custom">
              <p className="text-text-secondary font-medium">No articles in this series yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((edge, index) => (
                <ArticleCard
                  key={edge.node.slug || index}
                  post={edge.node}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

