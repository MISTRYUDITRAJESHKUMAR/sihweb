import React from 'react';
import { 
  HiOutlineBookOpen, 
  HiOutlineCodeBracket, 
  HiOutlineClipboardDocumentCheck, 
  HiOutlineTrophy, 
  HiOutlineMicrophone, 
  HiOutlineCheckBadge, 
  HiOutlineChartBar, 
  HiOutlineBriefcase 
} from 'react-icons/hi2';

const defaultSteps = [
  { id: 'learn', label: 'Learn', icon: HiOutlineBookOpen },
  { id: 'practice', label: 'Practice', icon: HiOutlineCodeBracket },
  { id: 'assess', label: 'Assess', icon: HiOutlineClipboardDocumentCheck },
  { id: 'code', label: 'Code', icon: HiOutlineTrophy },
  { id: 'interview', label: 'Mock Interview', icon: HiOutlineMicrophone },
  { id: 'verify', label: 'Verify', icon: HiOutlineCheckBadge },
  { id: 'improve', label: 'Improve', icon: HiOutlineChartBar },
  { id: 'hired', label: 'Get Hired', icon: HiOutlineBriefcase }
];

const JourneyTracker = ({ currentStage, currentStep, steps = defaultSteps, onStageClick }) => {
  let currentIndex = 0;
  if (typeof currentStep === 'number') {
    currentIndex = currentStep;
  } else if (currentStage) {
    const stageStr = String(currentStage).toLowerCase();
    const idx = steps.findIndex(s => (s.id && s.id.toLowerCase() === stageStr) || (s.label && s.label.toLowerCase() === stageStr) || String(s).toLowerCase() === stageStr);
    if (idx !== -1) currentIndex = idx;
  }

  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="flex items-center min-w-max px-2">
        {steps.map((step, index) => {
          const stepObj = typeof step === 'string' ? { id: step.toLowerCase(), label: step, icon: defaultSteps[index % defaultSteps.length].icon } : step;
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = stepObj.icon || HiOutlineCheckBadge;

          return (
            <React.Fragment key={stepObj.id || index}>
              {/* Step Circle */}
              <div 
                className="flex flex-col items-center relative z-10"
                onClick={() => onStageClick && onStageClick(stepObj.id || stepObj.label)}
                style={{ cursor: onStageClick ? 'pointer' : 'default' }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isPast ? 'bg-emerald-500 border-emerald-300 text-white' :
                  isCurrent ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg transform scale-110' :
                  'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`mt-2 text-xs font-semibold ${
                  isCurrent ? 'text-indigo-600 dark:text-indigo-400' : isPast ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {stepObj.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 w-12 h-1 mx-2 relative -top-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className={`h-full transition-all duration-500 ${isPast ? 'bg-emerald-500' : 'bg-transparent'}`}></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyTracker;
