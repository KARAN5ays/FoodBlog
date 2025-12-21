'use client';
import { useState, useEffect } from 'react';
type InteractionType = 'likes' | 'bookmarks';
export const useInteractions = (postSlug: string) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // Load initial state from localStorage (or DB if auth exists)
    useEffect(() => {
        const likes = JSON.parse(localStorage.getItem('user_likes') || '[]');
        const bookmarks = JSON.parse(localStorage.getItem('user_bookmarks') || '[]');
        setIsLiked(likes.includes(postSlug));
        setIsBookmarked(bookmarks.includes(postSlug));
        setIsMounted(true);
    }, [postSlug]);
    const toggleInteraction = (type: InteractionType) => {
        const storageKey = `user_${type}`;
        const currentItems = JSON.parse(localStorage.getItem(storageKey) || '[]');

        let newItems;
        if (currentItems.includes(postSlug)) {
            newItems = currentItems.filter((slug: string) => slug !== postSlug);
            if (type === 'likes') setIsLiked(false);
            else setIsBookmarked(false);
        } else {
            newItems = [...currentItems, postSlug];
            if (type === 'likes') setIsLiked(true);
            else setIsBookmarked(true);
        }
        localStorage.setItem(storageKey, JSON.stringify(newItems));
        // TODO: If using Firebase Auth, also update the database here:
        // if (user) {
        //    updateDoc(doc(db, 'users', user.uid), { [type]: newItems });
        // }
    };
    return {
        isLiked,
        isBookmarked,
        isMounted,
        toggleLike: () => toggleInteraction('likes'),
        toggleBookmark: () => toggleInteraction('bookmarks')
    };
};