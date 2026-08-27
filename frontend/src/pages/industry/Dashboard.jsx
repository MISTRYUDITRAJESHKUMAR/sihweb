import React, { useState, useEffect } from 'react';
import { HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineClock, HiOutlineDocumentCheck, HiOutlineSparkles } from 'react-icons/hi2';
import { Card, StatCard, Badge, LoadingSpinner } from '../../components/common';
import { BarChart } from '../../components/charts';
import { industry } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function IndustryDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: 'Open Positions', value: 8, icon: HiOutlineBriefcase, color: 'blue' },
    { title: 'Total Applications', value: 245, icon: HiOutlineDocumentCheck, color: 'indigo' },
    { title: 'Shortlisted', value: 42, icon: HiOutlineUserGroup, color: 'purple' },
    { title: 'Avg Time to Hire', value: '14 Days', icon: HiOutlineClock, color: 'green' },
  ];

  const skillDemand = [
    { name: 'React', value: 85 },
    { name: 'Node.js', value: 70 },
    { name: 'Python', value: 65 },
    { name: 'AWS', value: 50 },
    { name: 'TypeScript', value: 45 },
  ];

  const recentApps = [
    { id: 1, name: 'Rahul Sharma', role: 'Frontend Developer', score: 92, status: 'Shortlisted' },
    { id: 2, name: 'Priya Patel', role: 'Backend Developer', score: 88, status: 'Under Review' },
    { id: 3, name: 'Amit Kumar', role: 'Frontend Developer', score: 85, status: 'Under Review' },
    { id: 4, name: 'Sneha Reddy', role: 'Data Analyst', score: 78, status: 'Applied' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evidence-Based Hiring Dashboard</h1>
          <p className="text-gray-500 mt-1">{user?.name || 'Company Name'} Recruitment Portal</p>
        </div>
        <div className="flex space-x-3">
          <a href="/industry/post-job" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Post Job</a>
          <a href="/industry/candidates" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Find Talent</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Candidate Pipeline</h3>
          <div className="space-y-4">
            {[
              { label: 'Applications', count: 245, color: 'bg-blue-500', width: '100%' },
              { label: 'Screened (AI)', count: 180, color: 'bg-indigo-500', width: '75%' },
              { label: 'Interviewed', count: 65, color: 'bg-purple-500', width: '30%' },
              { label: 'Offered', count: 18, color: 'bg-pink-500', width: '10%' },
              { label: 'Hired', count: 12, color: 'bg-green-500', width: '5%' },
            ].map(step => (
              <div key={step.label} className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{step.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{step.count}</span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                  <div style={{ width: step.width }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${step.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <BarChart data={skillDemand} title="Most Requested Skills (Your Postings)" color="#4f46e5" xKey="name" yKey="value" />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <Badge variant="primary" className="flex items-center gap-1"><HiOutlineSparkles /> AI Scored</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Role Applied</th>
                <th className="px-4 py-3">AI Match Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentApps.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{app.name}</td>
                  <td className="px-4 py-3 text-gray-600">{app.role}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${app.score >= 90 ? 'text-green-600' : 'text-indigo-600'}`}>{app.score}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={app.status === 'Shortlisted' ? 'success' : app.status === 'Under Review' ? 'warning' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
