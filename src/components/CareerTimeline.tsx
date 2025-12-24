import React from 'react';

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface CareerTimelineProps {
  items: TimelineItem[];
}

const CareerTimeline = ({ items }: CareerTimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600"></div>
      
      {/* Timeline items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start gap-6">
            {/* Timeline dot */}
            <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {index + 1}
            </div>
            
            {/* Content */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{item.company}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{item.period}</p>
              <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimeline;
