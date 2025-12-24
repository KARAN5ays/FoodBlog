import React from 'react';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
}

interface ContentHubProps {
  items: ContentItem[];
}

const ContentHub = ({ items }: ContentHubProps) => {
  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Link
            key={item.id}
            href={`/posts/${item.id}`}
            className="block bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                {item.category}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{item.readTime}</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
              {item.description}
            </p>
            
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {item.date}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentHub;
