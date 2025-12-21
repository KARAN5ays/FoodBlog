'use client';
import React from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { useInteractions } from '@/hooks/useInteractions';
interface InteractionButtonsProps {
    postSlug: string;
    showLabel?: boolean;
}
const InteractionButtons = ({ postSlug, showLabel = false }: InteractionButtonsProps) => {
    const { isLiked, isBookmarked, isMounted, toggleLike, toggleBookmark } = useInteractions(postSlug);

    // Prevent hydration mismatch by rendering a skeleton until mounted
    if (!isMounted) {
        return (
            <div className="flex items-center gap-4 animate-pulse">
                <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 w-9 h-9"></div>
                <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 w-9 h-9"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike();
                }}
                aria-label={isLiked ? "Unlike post" : "Like post"}
                className={`flex items-center gap-1.5 transition-all duration-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 ${isLiked ? 'text-red-500 scale-110' : 'text-text-secondary hover:text-red-500'
                    }`}
            >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                {showLabel && <span className="text-sm font-medium">Like</span>}
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBookmark();
                }}
                aria-label={isBookmarked ? "Remove from bookmarks" : "Save post"}
                className={`flex items-center gap-1.5 transition-all duration-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 ${isBookmarked ? 'text-blue-600 scale-110' : 'text-text-secondary hover:text-blue-600'
                    }`}
            >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                {showLabel && <span className="text-sm font-medium">Save</span>}
            </button>
        </div>
    );
};
export default InteractionButtons;