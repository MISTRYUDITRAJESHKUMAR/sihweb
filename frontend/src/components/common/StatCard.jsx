import React from 'react';
import Card from './Card';

const StatCard = ({ icon: Icon, value, label, title, trend, color = 'indigo', className = '' }) => {
  const displayLabel = label || title;
  const colorStyles = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' }
  };

  const selectedColor = colorStyles[color];

  return (
    <Card className={className}>
      <div className="flex items-center">
        <div className={`p-4 rounded-xl ${selectedColor.bg} ${selectedColor.text} mr-4`}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{displayLabel}</p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
            {trend && (
              <span className={`text-sm font-semibold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
