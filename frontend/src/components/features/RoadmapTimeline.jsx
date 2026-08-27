import React from 'react';
import { HiCheck, HiPlay } from 'react-icons/hi2';

const RoadmapTimeline = ({ steps = [] }) => {
  return (
    <div className="relative border-l-2 border-gray-200 ml-6 mt-4 space-y-8">
      {steps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        const isPending = step.status === 'pending';

        return (
          <div key={index} className="relative pl-8">
            {/* Timeline dot */}
            <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white
              ${isCompleted ? 'border-green-500 bg-green-500' : isCurrent ? 'border-indigo-600 animate-pulse-slow' : 'border-gray-300'}`}
            >
              {isCompleted && <HiCheck className="w-3 h-3 text-white" />}
              {isCurrent && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
            </div>

            {/* Content */}
            <div className={`p-4 rounded-xl border ${isCurrent ? 'border-indigo-200 bg-indigo-50 shadow-sm' : 'border-gray-100 bg-white'} transition-all`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold ${isCurrent ? 'text-indigo-900' : 'text-gray-900'}`}>{step.title}</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{step.duration}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>
              
              {isCurrent && (
                <button className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  <HiPlay className="w-4 h-4 mr-1" /> Start Learning
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapTimeline;
