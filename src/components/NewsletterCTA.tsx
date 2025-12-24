'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Send, CheckCircle2 } from 'lucide-react';
import { HashnodePublication } from '@/lib/hashnode';

interface NewsletterCTAProps {
    publication?: HashnodePublication | null;
}

const NewsletterCTA = ({ publication }: NewsletterCTAProps) => {
    const [embedLoaded, setEmbedLoaded] = useState(false);

    useEffect(() => {
        // Small delay to ensure Beehiiv embed renders properly
        const timer = setTimeout(() => setEmbedLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Load Beehiiv embed script */}
            <Script
                src="https://subscribe-forms.beehiiv.com/embed.js"
                strategy="lazyOnload"
                onLoad={() => setEmbedLoaded(true)}
            />

            <section className="py-24 relative overflow-hidden" suppressHydrationWarning>
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/50 dark:to-muted/10 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto bg-surface rounded-[2.5rem] shadow-2xl shadow-blue-900/5 dark:shadow-black/20 border border-border-custom overflow-hidden">
                        <div className="flex flex-col md:flex-row relative">

                            {/* Left Column */}
                            <div className="md:w-1/2 bg-blue-600 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl" />
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-600 rounded-full opacity-50 blur-3xl" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-blue-500/30 border border-blue-400/30 rounded-full text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        {publication?.title || 'Blog'} Newsletter
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white tracking-tight">
                                        Stay Updated
                                    </h2>

                                    <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-sm">
                                        {publication?.descriptionSEO || 'Get the latest articles and updates delivered to your inbox.'}
                                    </p>

                                    <div className="flex flex-col gap-3 text-sm text-blue-50 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>
                                            <span>No spam, unsubscribe anytime</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>
                                            <span>New articles delivered weekly</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Beehiiv Embed */}
                            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-surface">
                                <div className="w-full max-w-md mx-auto">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Subscribe to our newsletter</h3>
                                    <p className="text-text-secondary mb-8">
                                        Get the latest articles sent directly to your inbox.
                                    </p>

                                    {/* Beehiiv Embed Container */}
                                    <div className="beehiiv-container" suppressHydrationWarning>
                                        <iframe
                                            src="https://subscribe-forms.beehiiv.com/a10a5045-d2bb-4d00-b407-3b357cfc081e"
                                            className="beehiiv-embed"
                                            data-test-id="beehiiv-embed"
                                            frameBorder="0"
                                            scrolling="no"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                margin: 0,
                                                borderRadius: '0px',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>

                                    {!embedLoaded && (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="h-8 w-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                                        </div>
                                    )}

                                    <p className="text-xs text-text-secondary text-center mt-6">
                                        We respect your privacy. No spam, ever.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewsletterCTA;
