'use client';

import React, { useState } from 'react';

const NewsletterCTA = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        // Simulate a successful subscribe
        setSubmitted(true);
        setEmail('');
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl border border-border-custom">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Column */}
                        <div className="md:w-1/2 bg-blue-600 text-white p-8 md:p-12 flex flex-col justify-center">
                            <p className="uppercase text-[10px] font-bold tracking-[0.2em] mb-4 text-blue-200">
                                Newsletter Call to Action
                            </p>
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                                Keep your tech skills
                                <br />
                                <span className="text-yellow-400">growing</span>
                            </h2>
                            <div className="space-y-4 opacity-90 text-sm">
                                <p>
                                    <strong className="text-blue-100">Without a newsletter:</strong> visitors read one article, close the tab, and never return.
                                </p>
                                <p>
                                    <strong className="text-blue-100">With a newsletter:</strong> you keep your audience, notify them when new tutorials,
                                    project breakdowns, and career tips are published.
                                </p>
                                <p>
                                    Join our list and get the latest development guides, tools, and insights in your inbox.
                                </p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:w-1/2 bg-surface p-8 md:p-12 flex flex-col justify-center">
                            <div className="w-full">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Get the latest tech articles in your inbox</h3>
                                <p className="text-text-secondary text-sm mb-8">
                                    No spam. Just carefully crafted tutorials, best practices, and real-world engineering tips.
                                </p>

                                {submitted && (
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl text-sm mb-6 animate-in fade-in zoom-in duration-300">
                                        Thanks for subscribing! You'll hear from us soon.
                                    </div>
                                )}

                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="newsletterEmail"
                                            suppressHydrationWarning={true}
                                            className="peer w-full px-4 py-4 bg-muted border border-border-custom rounded-xl text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label
                                            htmlFor="newsletterEmail"
                                            className="absolute left-4 -top-2.5 px-1 bg-surface text-xs font-semibold text-blue-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:text-xs"
                                        >
                                            Email address
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        suppressHydrationWarning={true}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] hover:-translate-y-0.5"
                                    >
                                        Subscribe for free
                                    </button>

                                    <p className="text-[10px] text-text-secondary text-center mt-2">
                                        By subscribing you agree to receive occasional email updates. You can unsubscribe anytime.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
