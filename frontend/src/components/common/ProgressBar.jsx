import React from 'react';

const ProgressBar = ({ value, progress, color = 'indigo', label, showPercentage = false, height = 'md', className = '' }) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const rawVal = value !== undefined ? value : (progress !== undefined ? progress : 0);
  const numVal = Math.min(100, Math.max(0, Number(rawVal) || 0));

  const bgColors = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };

  const barColor = color.startsWith('bg-') ? color : (bgColors[color] || 'bg-indigo-600');

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-sm">
          {label && <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          {showPercentage && <span className="font-medium text-gray-500 dark:text-gray-400">{Math.round(numVal)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden ${heights[height] || heights.md}`}>
        <div 
          className={`${barColor} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${numVal}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
