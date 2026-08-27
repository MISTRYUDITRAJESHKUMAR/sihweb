import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4`}></div>
      {message && <p className="text-gray-500 font-medium">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
