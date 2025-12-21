'use client';

import React, { useEffect, useState } from 'react';

const ReadingProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                const scrollPercent = (currentProgress / scrollHeight) * 100;
                setProgress(Math.min(100, Math.max(0, scrollPercent)));
            } else {
                setProgress(0);
            }
        };

        // Initial calculation on mount
        updateProgress();

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[9999] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ReadingProgressBar;
