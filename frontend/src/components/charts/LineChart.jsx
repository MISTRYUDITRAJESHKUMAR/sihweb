import React from 'react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../common/Card';

const LineChart = ({ data = [], title, lines = [], xKey = 'name' }) => {
  return (
    <Card title={title}>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data || []} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" className="dark:stroke-gray-800" />
            <XAxis dataKey={xKey} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            {(lines || []).map((line, idx) => (
              <Line 
                key={idx}
                type="monotone" 
                dataKey={line.dataKey || line.key || 'value'} 
                name={line.name || 'Value'}
                stroke={line.color || '#4f46e5'} 
                strokeWidth={3}
                activeDot={{ r: 6 }} 
                dot={false}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LineChart;
