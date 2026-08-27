import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  value, 
  onAnswer, 
  onChange, 
  index, 
  number 
}) => {
  if (!question) return null;

  const currentAnswer = value !== undefined ? value : (selectedAnswer !== undefined ? selectedAnswer : '');
  const handleSelect = (val) => {
    if (onChange) onChange(val);
    if (onAnswer) onAnswer(val);
  };

  const questionNum = number !== undefined ? number : (index !== undefined ? index + 1 : 1);
  const questionText = question.question || question.text || 'Question';
  const difficulty = question.difficulty || 'Medium';

  return (
    <Card className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Question {questionNum}
        </h3>
        <Badge text={difficulty} variant={difficulty === 'Hard' ? 'red' : difficulty === 'Easy' ? 'green' : 'yellow'} />
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 mb-6 text-base font-medium leading-relaxed">{questionText}</p>

      {question.options && question.options.length > 0 ? (
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <label 
              key={i} 
              className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                currentAnswer === option 
                  ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm' 
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id || questionNum}`}
                value={option}
                checked={currentAnswer === option}
                onChange={() => handleSelect(option)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <textarea
          value={currentAnswer}
          onChange={(e) => handleSelect(e.target.value)}
          rows={4}
          placeholder="Type your explanation or answer here..."
          className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
        />
      )}
    </Card>
  );
};

export default QuestionCard;
