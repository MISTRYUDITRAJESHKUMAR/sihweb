import React, { useState, useEffect } from 'react';
import { college } from '../../api/client';
import { Card, LoadingSpinner } from '../../components/common';
import { BarChart } from '../../components/charts';
import { toast } from 'react-hot-toast';

export default function SkillAnalytics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mock data
        setData({
          studentSkills: [
            { name: 'JavaScript', value: 850 },
            { name: 'React', value: 720 },
            { name: 'Python', value: 690 },
            { name: 'Java', value: 650 },
            { name: 'SQL', value: 580 },
          ],
          industryDemand: [
            { name: 'Python', value: 920 },
            { name: 'AWS', value: 880 },
            { name: 'React', value: 850 },
            { name: 'Machine Learning', value: 750 },
            { name: 'JavaScript', value: 720 },
          ],
          recommendations: [
            { skill: 'AWS / Cloud Computing', reason: 'High industry demand (88%) but low student proficiency (35%). Consider adding a cloud foundations workshop.' },
            { skill: 'Machine Learning', reason: 'Growing demand (+40% YoY). Current curriculum only covers basics. Recommend an advanced FDP.' },
            { skill: 'System Design', reason: 'Common reason for interview rejections in product companies. Needs integration into final year projects.' },
          ],
          heatmap: [
            { skill: 'React', low: 15, medium: 45, high: 40 },
            { skill: 'Python', low: 20, medium: 50, high: 30 },
            { skill: 'AWS', low: 65, medium: 25, high: 10 },
            { skill: 'Docker', low: 70, medium: 20, high: 10 },
            { skill: 'Data Structures', low: 30, medium: 40, high: 30 },
          ]
        });
      } catch (error) {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Skill Analytics & Gap Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <BarChart data={data.studentSkills} title="Skills Our Students Have" color="#4f46e5" xKey="name" yKey="value" />
        </Card>
        <Card className="p-6">
          <BarChart data={data.industryDemand} title="Skills Industry Demands" color="#10b981" xKey="name" yKey="value" />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Skill Proficiency Distribution (Heatmap)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="text-left pb-3 pl-4">Skill</th>
                <th className="pb-3">Low Proficiency</th>
                <th className="pb-3">Medium Proficiency</th>
                <th className="pb-3">High Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {data.heatmap.map((row) => (
                <tr key={row.skill} className="border-b border-gray-50 last:border-0">
                  <td className="text-left py-4 pl-4 font-medium text-gray-800">{row.skill}</td>
                  <td className="py-4 px-2">
                    <div className="w-full bg-red-100 rounded text-red-800 font-medium py-1" style={{ opacity: Math.max(0.2, row.low / 100) }}>{row.low}%</div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="w-full bg-yellow-100 rounded text-yellow-800 font-medium py-1" style={{ opacity: Math.max(0.2, row.medium / 100) }}>{row.medium}%</div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="w-full bg-green-100 rounded text-green-800 font-medium py-1" style={{ opacity: Math.max(0.2, row.high / 100) }}>{row.high}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 bg-indigo-50 border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">AI Recommendations: Top Skills to Focus On</h3>
        <div className="space-y-4">
          {data.recommendations.map((rec, index) => (
            <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{rec.skill}</h4>
                <p className="text-gray-600 text-sm mt-1">{rec.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
