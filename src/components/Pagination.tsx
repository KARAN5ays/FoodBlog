import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Pagination" className="my-12">
            <ul className="flex items-center justify-center gap-3 list-none">
                {/* Previous */}
                <li>
                    <Link
                        href={`/?page=${currentPage - 1}`}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${currentPage === 1
                                ? 'pointer-events-none opacity-40 border-border-custom bg-muted text-text-secondary'
                                : 'border-border-custom bg-surface hover:border-blue-600 hover:text-blue-600 text-foreground'
                            }`}
                        aria-disabled={currentPage === 1}
                    >
                        ← Prev
                    </Link>
                </li>

                {/* Page numbers */}
                {pages.map(page => (
                    <li key={page}>
                        <Link
                            href={`/?page=${page}`}
                            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all border ${page === currentPage
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-surface border-border-custom text-text-secondary hover:border-blue-600 hover:text-blue-600'
                                }`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}

                {/* Next */}
                <li>
                    <Link
                        href={`/?page=${currentPage + 1}`}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${currentPage === totalPages
                                ? 'pointer-events-none opacity-40 border-border-custom bg-muted text-text-secondary'
                                : 'border-border-custom bg-surface hover:border-blue-600 hover:text-blue-600 text-foreground'
                            }`}
                        aria-disabled={currentPage === totalPages}
                    >
                        Next →
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
