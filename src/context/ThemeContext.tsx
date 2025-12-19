'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    theme: string;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>('light');
    const [mounted, setMounted] = useState(false);

    // Load initial theme from localStorage or system preference
    useEffect(() => {
        setMounted(true);
        const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        if (stored === 'dark' || stored === 'light') {
            setTheme(stored);
            return;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    // Sync theme to document element class and localStorage
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return ctx;
};
