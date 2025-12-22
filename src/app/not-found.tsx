import Link from 'next/link';
import { Home } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600/20 mb-4 select-none">404</h1>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Page Not Found</h2>
            <p className="text-text-secondary max-w-md mb-8">
                The page you are looking for might have been moved, deleted, or never existed.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
            >
                <Home size={20} />
                Back to Home
            </Link>
        </div>
    );
}
