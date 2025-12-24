import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid = ({ children, className = "" }: BentoGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const BentoGridItem = ({ title, description, className = "", children }: BentoGridItemProps) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
      {children}
    </div>
  );
};

export { BentoGrid, BentoGridItem };
