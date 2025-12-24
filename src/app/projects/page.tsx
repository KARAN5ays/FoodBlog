
import React from 'react';
import { Metadata } from 'next';
import { getPosts, getPublication } from '@/lib/hashnode';
import ProjectCard from '@/components/ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Projects | Portfolio',
    description: 'Showcase of my latest projects, applications, and technical experiments.',
};

export const revalidate = 60; // Revalidate every minute

export default async function ProjectsPage() {
    const [postsData, publication] = await Promise.all([
        getPosts(50), // Fetch enough posts to likely find the projects
        getPublication()
    ]);

    const posts = postsData.edges;

    // Filter for projects
    // Looks for tags: 'project', 'projects', 'portfolio', 'showcase'
    const projectPosts = posts.filter(edge =>
        edge.node.tags.some(tag =>
            ['project', 'projects', 'portfolio', 'showcase', 'app'].includes(tag.name.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-surface border-b border-border-custom pt-16 pb-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                                <Layers size={14} />
                                <span>Portfolio</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
                                Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Passion</span>
                            </h1>
                            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                                A collection of projects, experiments, and applications I've built.
                                Click on any card to read the case study.
                            </p>
                        </div>

                        {projectPosts.length > 0 && (
                            <div className="text-right hidden md:block">
                                <p className="text-3xl font-black text-foreground">{projectPosts.length}</p>
                                <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">Projects</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 max-w-7xl mt-12">
                {projectPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectPosts.map(edge => (
                            <ProjectCard key={edge.node.slug} project={edge.node} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface rounded-3xl border border-border-custom border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                            <Sparkles size={32} className="text-text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No Projects Found</h3>
                        <p className="text-text-secondary max-w-md mx-auto mb-6">
                            I haven't tagged any posts as projects yet.
                            <br />
                            <span className="text-sm opacity-75">(Tag your Hashnode posts with <code>#project</code> to see them here)</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
