import React from 'react';

const Card = ({ children, className = '', title, subtitle, icon: Icon, action, hover = false }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 ${hover ? 'hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-100 dark:hover:border-indigo-900/50' : ''} ${className}`}>
      {(title || subtitle || Icon || action) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div>
              {title && <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
