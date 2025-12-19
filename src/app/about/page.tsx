import React from 'react';
import { Metadata } from 'next';
import { Code, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us | Aerawat Engineering',
    description: 'Learn about Aerawat Engineering, our mission to make technology accessible, and the team behind our insights.',
};

const About = () => {
    return (
        <div className="pb-20">
            {/* Page Header */}
            <div className="relative h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/007/926/257/small/futuristic-hud-interface-technology-background-vector.jpg")' }}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="relative z-20 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-in fade-in slide-in-from-bottom duration-700">
                        About Aerawat Engineering
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-300 font-medium">
                        Celebrating the Innovations of Technology
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-30">
                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 bg-surface rounded-3xl shadow-xl border border-border-custom hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <Code size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Practical Learning</h4>
                        <p className="text-text-secondary leading-relaxed">
                            Every article is carefully crafted to provide real-world examples and actionable insights.
                        </p>
                    </div>

                    <div className="p-8 bg-surface rounded-3xl shadow-xl border border-border-custom hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <Zap size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Innovative Solutions</h4>
                        <p className="text-text-secondary leading-relaxed">
                            We believe technology empowers innovation and drives the future of engineering.
                        </p>
                    </div>

                    <div className="p-8 bg-surface rounded-3xl shadow-xl border border-border-custom hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                            <Users size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Community First</h4>
                        <p className="text-text-secondary leading-relaxed">
                            Join a growing community of developers and engineers sharing their knowledge and experiences.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 py-12">
                    <div className="lg:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                            className="rounded-3xl shadow-2xl w-full border-8 border-surface"
                            alt="Technology and Engineering"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">It started with a single line of code.</h2>
                        <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
                            <p>
                                Aerawat Engineering began with a mission: to make technology accessible and understandable for everyone.
                                What started as a passion project has grown into a platform for sharing knowledge and innovation.
                            </p>
                            <p>
                                We believe that technology is more than just tools; it's a gateway to solving real-world problems and creating impactful solutions.
                                Whether you're learning programming fundamentals or building complex systems, we're here to guide you every step of the way.
                            </p>
                        </div>
                        <button className="mt-8 px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold rounded-full transition-all duration-300 active:scale-95">
                            Read Full Story
                        </button>
                    </div>
                </div>

                {/* Creator Profile */}
                <div className="bg-muted/30 p-8 md:p-16 rounded-[3rem] mb-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Meet the Creator</h2>
                    <div className="max-w-2xl mx-auto flex flex-col items-center">
                        <div className="relative group mb-8">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <img
                                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80"
                                className="relative rounded-full border-4 border-surface shadow-xl w-40 h-40 object-cover"
                                alt="Creator"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Karan Pokhrel</h3>
                        <p className="text-blue-600 font-bold mb-6">Lead Engineer & Writer</p>
                        <blockquote className="text-xl text-text-secondary italic leading-relaxed">
                            "Coding is an art, but building solutions is a passion. I started this platform to document my
                            journey through technology and to help others navigate their own path in engineering."
                        </blockquote>
                    </div>
                </div>

                {/* Simplified Newsletter CTA for About Page */}
                <div className="text-center py-12 border-t border-border-custom">
                    <h2 className="text-3xl font-extrabold mb-4">Stay in the Loop</h2>
                    <p className="text-text-secondary mb-8 max-w-lg mx-auto">Get the latest articles and tech insights delivered straight to your inbox.</p>
                    <div className="max-w-sm mx-auto">
                        <div className="flex gap-2">
                            <input
                                type="email"
                                className="flex-grow px-6 py-3 bg-muted border border-border-custom rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="Your email address"
                            />
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
