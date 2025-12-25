'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Eye, Heart, Clock, TrendingUp } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

interface LiveStatsProps {
  stats: StatItem[];
}

const getIconForLabel = (label: string) => {
  const iconProps = { size: 32, className: "mb-3" };

  switch (label) {
    case 'Articles':
      return <BookOpen {...iconProps} className="mb-3 text-blue-500" />;
    case 'Total Views':
      return <Eye {...iconProps} className="mb-3 text-purple-500" />;
    case 'Total Likes':
      return <Heart {...iconProps} className="mb-3 text-pink-500" />;
    case 'Avg Read Time':
      return <Clock {...iconProps} className="mb-3 text-green-500" />;
    case 'Engagement':
      return <TrendingUp {...iconProps} className="mb-3 text-orange-500" />;
    default:
      return null;
  }
};

const LiveStats = ({ stats }: LiveStatsProps) => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const newValues: Record<string, number> = {};

    stats.forEach(stat => {
      const targetValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
      const duration = stat.duration || 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        newValues[stat.label] = Math.floor(current);
        setAnimatedValues({ ...newValues });
      }, duration / steps);
    });
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-surface rounded-2xl p-6 border border-border-custom shadow-sm hover:shadow-md transition-all text-center"
        >
          <div className="flex justify-center">
            {getIconForLabel(stat.label)}
          </div>
          <div className="text-4xl font-bold mb-2 text-foreground">
            {animatedValues[stat.label] || 0}{stat.suffix}
          </div>
          <div className="text-sm text-text-secondary uppercase tracking-wider font-bold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveStats;
