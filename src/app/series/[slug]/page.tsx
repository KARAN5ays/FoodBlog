import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} Series | Aerawat Engineering`,
    description: `Articles in the ${slug} series`,
  };
}

export default async function Series({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // You can fetch series data here based on slug
  // For now, showing a placeholder
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent capitalize">
            {slug} Series
          </h1>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">
              This is the {slug} series page. Articles in this series will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
