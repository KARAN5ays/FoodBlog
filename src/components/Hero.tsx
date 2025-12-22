import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative overflow-hidden text-white bg-slate-900 rounded-b-[3rem] shadow-2xl">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
                            WELCOME TO Aerawat Engineering
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Innovative Technology <br />
                            <span className="text-blue-500">Made Simple</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            From core programming concepts to real-world projects, discover guides that will make every tech journey easier.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                href="/posts"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95"
                            >
                                Start Learning
                            </Link>
                            <Link
                                href="/about"
                                className="px-8 py-3 border border-slate-600 hover:bg-slate-800 text-white font-bold rounded-full transition-all active:scale-95"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
                        <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden border-4 border-slate-700/50 rotate-2 transition-transform duration-500 group-hover:rotate-0">
                            <Image
                                src="/images/nasa-Q1p7bh3SHj8-unsplash.jpg"
                                alt="Innovative Technology"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
