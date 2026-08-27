import React, { useState, useEffect } from 'react';

const CodeEditor = ({ code, value, onChange, language = 'javascript', readOnly = false, className = '' }) => {
  const currentCode = code !== undefined ? code : (value !== undefined ? value : '');
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const text = String(currentCode || '');
    const lineCount = (text.match(/\n/g) || []).length + 1;
    setLines(Array.from({ length: Math.max(12, lineCount) }, (_, i) => i + 1));
  }, [currentCode]);

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700 flex bg-gray-900 shadow-inner ${className}`}>
      <div className="py-4 px-2 bg-gray-800/80 text-gray-500 text-right select-none font-mono text-sm leading-6 border-r border-gray-700 min-w-[3rem]">
        {lines.map(n => <div key={n}>{n}</div>)}
      </div>
      <textarea
        value={currentCode}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={readOnly}
        spellCheck="false"
        className="flex-1 bg-transparent text-gray-100 p-4 font-mono text-sm leading-6 outline-none resize-none whitespace-pre overflow-x-auto selection:bg-indigo-600/40"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};

export default CodeEditor;
