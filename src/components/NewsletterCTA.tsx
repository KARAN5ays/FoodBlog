'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { HashnodePublication } from '@/lib/hashnode';

interface NewsletterCTAProps {
    publication?: HashnodePublication | null;
}

const NewsletterCTA = ({ publication }: NewsletterCTAProps) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        setSubmitted(true);
        setEmail('');
        setLoading(false);
    };

    return (
        <section className="py-24 relative overflow-hidden">
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

                        {/* Right Column */}
                        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-surface">
                            <div className="w-full max-w-md mx-auto">
                                <h3 className="text-2xl font-bold text-foreground mb-2">Subscribe to our newsletter</h3>
                                <p className="text-text-secondary mb-8">
                                    Get the latest articles sent directly to your inbox.
                                </p>

                                {submitted ? (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-6 rounded-2xl flex flex-col items-center text-center animate-fade-in">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-3">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h4 className="font-bold text-lg mb-1">You're on the list!</h4>
                                        <p className="text-sm opacity-90">Watch your inbox for the next edition.</p>
                                    </div>
                                ) : (
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <input
                                                    type="email"
                                                    id="newsletterEmail"
                                                    suppressHydrationWarning={true}
                                                    className="w-full px-5 py-4 bg-muted border border-border-custom rounded-xl text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                suppressHydrationWarning={true}
                                                disabled={loading}
                                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <div className="h-5 w-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        Subscribe Free <Send size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-xs text-text-secondary text-center mt-4">
                                            We respect your privacy. No spam, ever.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
