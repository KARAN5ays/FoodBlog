import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MousePointer2, ArrowUpRight } from 'lucide-react';
import { HashnodePost } from '@/lib/hashnode';

interface ProjectCardProps {
    project: HashnodePost;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const coverImage = project.coverImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070';

    // Extract tags that are NOT 'project' or 'portfolio' to show as tech stack
    const techStack = project.tags
        .filter(tag => !['project', 'portfolio', 'projects'].includes(tag.name.toLowerCase()))
        .slice(0, 3);

    return (
        <div className="group relative flex flex-col h-full bg-surface border border-border-custom rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold text-sm flex items-center gap-2 text-foreground shadow-xl">
                        View Case Study <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {techStack.map(tag => (
                            <span key={tag.name} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                        {project.brief}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-border-custom flex items-center justify-between">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Full Project
                    </span>
                    <Link href={`/posts/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View project ${project.title}`} />
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <MousePointer2 size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
