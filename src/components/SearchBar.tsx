'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { PostEdge } from '@/lib/hashnode';

interface SearchBarProps {
    posts: PostEdge[];
    placeholder?: string;
}

const SearchBar = ({ posts = [], placeholder }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<PostEdge[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!inputValue.trim()) {
            setSuggestions([]);
            return;
        }

        const lowerQuery = inputValue.toLowerCase();

        const filtered = posts.filter(({ node }) => {
            return (
                node.title?.toLowerCase().includes(lowerQuery) ||
                node.brief?.toLowerCase().includes(lowerQuery) ||
                node.tags?.some(tag => tag.name.toLowerCase().includes(lowerQuery))
            );
        }).slice(0, 5);

        setSuggestions(filtered);
    }, [inputValue, posts]);

    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 200);
    };

    const handleSelect = (slug: string) => {
        setInputValue('');
        setShowDropdown(false);
        router.push(`/posts/${slug}`);
    };

    return (
        <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                <Search size={18} />
            </span>
            <input
                suppressHydrationWarning
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-muted border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-foreground"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
            />

            {/* Dropdown Results */}
            {showDropdown && inputValue && (
                <div className="absolute top-full left-0 w-full mt-2 bg-surface rounded-xl shadow-xl overflow-hidden border border-border-custom z-50">
                    {suggestions.length > 0 ? (
                        suggestions.map(({ node }) => (
                            <div
                                key={node.slug}
                                className="flex items-center p-3 border-b border-border-custom last:border-0 hover:bg-muted cursor-pointer transition-colors"
                                onClick={() => handleSelect(node.slug)}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <img
                                    src={node.coverImage?.url || 'https://via.placeholder.com/50'}
                                    alt={node.title}
                                    className="rounded-lg object-cover flex-shrink-0 w-12 h-12"
                                />
                                <div className="ml-3 overflow-hidden">
                                    <h6 className="text-sm font-semibold text-foreground truncate">{node.title}</h6>
                                    <p className="text-[10px] text-text-secondary mt-1" suppressHydrationWarning>
                                        {new Date(node.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-text-secondary text-sm">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
