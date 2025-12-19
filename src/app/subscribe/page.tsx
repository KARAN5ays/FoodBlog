import React from 'react';
import NewsletterCTA from '@/components/NewsletterCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Subscribe | Aerawat Engineering',
    description: 'Subscribe to our newsletter to get the latest tech articles and tutorials in your inbox.',
};

export default function SubscribePage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <NewsletterCTA />
        </div>
    );
}
