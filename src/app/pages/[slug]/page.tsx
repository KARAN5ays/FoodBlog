import React from 'react';
import { notFound } from 'next/navigation';
import { getStaticPage } from '@/lib/hashnode';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = await getStaticPage(slug);

    if (!page) return { title: 'Page Not Found' };

    return {
        title: `${page.title} | Blog`,
    };
}

export default async function StaticPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getStaticPage(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl min-h-[60vh]">
            <h1 className="text-4xl md:text-5xl font-black mb-10 text-foreground tracking-tight">
                {page.title}
            </h1>
            <div
                className="article-content prose dark:prose-invert max-w-none prose-blue"
                dangerouslySetInnerHTML={{ __html: page.content?.html || '' }}
            />
        </div>
    );
}
