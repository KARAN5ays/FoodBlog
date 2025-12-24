import React from 'react';
import { getPublication } from '@/lib/hashnode';
import { Metadata } from 'next';
import { Mail, Twitter, Github, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    const publication = await getPublication();
    return {
        title: `Contact | ${publication?.title || 'Blog'}`,
        description: `Get in touch with ${publication?.title || 'us'}`,
    };
}

export default async function ContactPage() {
    const publication = await getPublication();

    if (!publication) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Connection Issue</h1>
                <p className="text-text-secondary max-w-md mb-8">
                    We're having trouble fetching current profile information from Hashnode.
                </p>
                <Link
                    href="/"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    const socialLinks = [
        { icon: Twitter, url: publication.links?.twitter, label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: Github, url: publication.links?.github, label: 'GitHub', color: 'hover:text-gray-700 dark:hover:text-gray-300' },
        { icon: Linkedin, url: publication.links?.linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
        { icon: Youtube, url: publication.links?.youtube, label: 'YouTube', color: 'hover:text-red-600' },
        { icon: Instagram, url: publication.links?.instagram, label: 'Instagram', color: 'hover:text-pink-600' },
        { icon: Globe, url: publication.links?.website, label: 'Website', color: 'hover:text-green-600' },
    ].filter(link => link.url);

    const displayName = publication.displayTitle || publication.title || 'the blog';

    return (
        <div className="min-h-screen bg-background" suppressHydrationWarning>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Contact {displayName}
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                            {publication.descriptionSEO || `Get in touch with the author of ${displayName}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Author/Publication Info */}
                        <div className="bg-surface rounded-3xl p-8 border border-border-custom shadow-lg">
                            <h2 className="text-2xl font-bold text-foreground mb-6">About {displayName}</h2>

                            <div className="flex items-center gap-4 mb-6">
                                {publication.preferences?.logo ? (
                                    <img
                                        src={publication.preferences.logo}
                                        alt={publication.title}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                                    />
                                ) : publication.author?.profilePicture ? (
                                    <img
                                        src={publication.author.profilePicture}
                                        alt={publication.author.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                                        {publication.title?.charAt(0) || 'B'}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-foreground">
                                        {publication.displayTitle || publication.title}
                                    </h3>
                                    {publication.author?.name && (
                                        <p className="text-text-secondary text-sm">
                                            by {publication.author.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {publication.author?.bio?.html ? (
                                <div
                                    className="text-text-secondary leading-relaxed prose dark:prose-invert prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: publication.author.bio.html }}
                                />
                            ) : (
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    {publication.descriptionSEO || `Welcome to ${displayName}. Check out our latest articles below.`}
                                </p>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="bg-surface rounded-3xl p-8 border border-border-custom shadow-lg">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Connect with us</h2>

                            {socialLinks.length > 0 ? (
                                <div className="space-y-4">
                                    {socialLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.url!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-all group ${link.color}`}
                                        >
                                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <link.icon size={24} className="text-text-secondary group-hover:text-current" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{link.label}</p>
                                                <p className="text-sm text-text-secondary truncate">
                                                    {link.url?.replace(/^https?:\/\//, '')}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-text-secondary">No social links available on Hashnode.</p>
                            )}
                        </div>
                    </div>

                    {/* Additional Section - Newsletter or Blog Link */}
                    <div className="mt-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-black mb-4">Stay Connected</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter or follow our blog for more frequent updates and insights.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/"
                                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
                            >
                                Visit Home
                            </Link>
                            <Link
                                href="/posts"
                                className="px-8 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all active:scale-95"
                            >
                                Browse Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
