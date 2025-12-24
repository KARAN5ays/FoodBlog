import React, { useState, useEffect } from 'react';
import { Book, X, Check } from 'lucide-react';

interface ReadingItem {
  id: string;
  title: string;
  author: string;
  url: string;
  addedDate: string;
  read?: boolean;
}

interface ReadingListProps {
  items?: ReadingItem[];
}

const ReadingList = ({ items = [] }: ReadingListProps) => {
  const [readingList, setReadingList] = useState<ReadingItem[]>(items);

  useEffect(() => {
    const saved = localStorage.getItem('readingList');
    if (saved) {
      setReadingList(JSON.parse(saved));
    }
  }, []);

  const addToReadingList = (item: ReadingItem) => {
    const newList = [...readingList, item];
    setReadingList(newList);
    localStorage.setItem('readingList', JSON.stringify(newList));
  };

  const removeFromReadingList = (id: string) => {
    const newList = readingList.filter(item => item.id !== id);
    setReadingList(newList);
    localStorage.setItem('readingList', JSON.stringify(newList));
  };

  const markAsRead = (id: string) => {
    const newList = readingList.map(item =>
      item.id === id ? { ...item, read: !item.read } : item
    );
    setReadingList(newList);
    localStorage.setItem('readingList', JSON.stringify(newList));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <Book className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Reading List</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {readingList.length} items to read
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {readingList.length === 0 ? (
          <div className="p-8 text-center">
            <Book className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Your reading list is empty</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {readingList.map(item => (
              <div key={item.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm mb-1 ${item.read ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{item.author}</p>
                    <p className="text-xs text-slate-500">{item.addedDate}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => markAsRead(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.read
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromReadingList(item.id)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-red-900 dark:hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingList;
