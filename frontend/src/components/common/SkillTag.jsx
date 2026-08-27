import React from 'react';

const SkillTag = ({ name, skill, level, score, className = '' }) => {
  const displayName = name || skill || 'Skill';

  const getLevelColor = (lvl) => {
    switch(String(lvl || '').toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 'bg-emerald-500';
      case 'intermediate':
        return 'bg-indigo-500';
      case 'beginner':
        return 'bg-blue-400';
      default:
        return 'bg-indigo-400';
    }
  };

  return (
    <div className={`inline-flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full pl-3 pr-2 py-1 shadow-sm text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors ${className}`}>
      <span className="mr-1.5">{displayName}</span>
      {score !== undefined && (
        <span className="text-[10px] text-gray-400 mr-1.5 font-normal">({score}%)</span>
      )}
      <div className={`w-2 h-2 rounded-full ${getLevelColor(level)}`} title={level || 'Proficient'}></div>
    </div>
  );
};

export default SkillTag;
