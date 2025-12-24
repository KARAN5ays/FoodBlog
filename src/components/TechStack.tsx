import React from 'react';

interface TechItem {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

interface TechStackProps {
  technologies: TechItem[];
}

const TechStack = ({ technologies }: TechStackProps) => {
  const getLevelColor = (level: TechItem['level']) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const categories = [...new Set(technologies.map(tech => tech.category))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">Tech Stack</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Technologies and tools I work with.
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 capitalize">
            {category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies
              .filter(tech => tech.category === category)
              .map(tech => (
                <div
                  key={tech.name}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {tech.icon && (
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-sm">
                          {tech.icon}
                        </div>
                      )}
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">
                        {tech.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getLevelColor(tech.level)} transition-all duration-500`}
                        style={{
                          width:
                            tech.level === 'expert'
                              ? '100%'
                              : tech.level === 'advanced'
                              ? '80%'
                              : tech.level === 'intermediate'
                              ? '60%'
                              : '40%'
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                      {tech.level}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
