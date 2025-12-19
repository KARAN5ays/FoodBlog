'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Something went wrong!</h2>
            <p className="text-text-secondary max-w-md mb-8">
                An error occurred while loading this page. Our team has been notified.
            </p>
            <button
                onClick={() => reset()}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95"
            >
                <RotateCcw size={20} />
                Try again
            </button>
        </div>
    );
}
