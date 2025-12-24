import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Calendar, Clock } from 'lucide-react';
import { PostEdge } from '@/lib/hashnode';
import { formatDate } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostEdge[];
}

const SearchOverlay = ({ isOpen, onClose, posts }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostEdge[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.node.title.toLowerCase().includes(query.toLowerCase()) ||
      post.node.brief?.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, posts]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center pt-20 px-4">
        <div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search articles..."
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Start typing to search articles</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">No articles found for "{query}"</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {results.map(edge => (
                  <a
                    key={edge.node.slug}
                    href={`/posts/${edge.node.slug}`}
                    className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    onClick={onClose}
                  >
                    <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
                      {edge.node.title}
                    </h3>
                    {edge.node.brief && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                        {edge.node.brief}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(edge.node.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.ceil((edge.node.content?.html?.length || 0) / 1000)} min read
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
