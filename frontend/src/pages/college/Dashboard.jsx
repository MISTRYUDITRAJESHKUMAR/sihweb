import React, { useState, useEffect } from 'react';
import { HiOutlineUsers, HiOutlineCheckBadge, HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi2';
import { college } from '../../api/client';
import { Card, StatCard, LoadingSpinner, Badge } from '../../components/common';
import { BarChart, PieChart, LineChart } from '../../components/charts';
import { toast } from 'react-hot-toast';

export default function CollegeDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Using mock data for demo robustness as per instructions
        const dashboardResponse = await college.getDashboard().catch(() => ({}));
        const mockData = {
          stats: {
            totalStudents: 1250,
            aiVerified: 850,
            placed: 420,
            avgSkillScore: 78
          },
          topSkills: [
            { name: 'React', value: 450 },
            { name: 'Python', value: 420 },
            { name: 'Node.js', value: 380 },
            { name: 'Java', value: 310 },
            { name: 'AWS', value: 250 },
            { name: 'Machine Learning', value: 210 },
          ],
          journeyStage: [
            { name: 'Exploring', value: 300 },
            { name: 'Learning', value: 450 },
            { name: 'Project Building', value: 250 },
            { name: 'Job Ready', value: 250 },
          ],
          placements: [
            { name: 'Jan', value: 40 },
            { name: 'Feb', value: 65 },
            { name: 'Mar', value: 85 },
            { name: 'Apr', value: 120 },
            { name: 'May', value: 180 },
            { name: 'Jun', value: 210 },
          ],
          recentActivity: [
            { id: 1, student: 'Rahul Sharma', action: 'Completed AI Verification', time: '2 hours ago' },
            { id: 2, student: 'Priya Patel', action: 'Earned AWS Certification', time: '5 hours ago' },
            { id: 3, student: 'Amit Kumar', action: 'Reached Job Ready stage', time: '1 day ago' },
            { id: 4, student: 'Sneha Reddy', action: 'Placed at TechCorp', time: '2 days ago' },
            { id: 5, student: 'Vikram Singh', action: 'Completed Python Basics', time: '2 days ago' },
          ],
          skillGaps: [
            { id: 1, skill: 'System Design', count: 180, severity: 'High' },
            { id: 2, skill: 'Cloud Architecture', count: 145, severity: 'Medium' },
            { id: 3, skill: 'DevOps (CI/CD)', count: 120, severity: 'Medium' },
          ]
        };
        setData(mockData);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Institution Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <a href="/college/students" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Student Progress</a>
          <a href="/college/skills" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Skill Analytics</a>
          <a href="/college/placements" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Placements</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={data.stats.totalStudents} icon={HiOutlineUsers} color="blue" />
        <StatCard title="AI Verified" value={data.stats.aiVerified} icon={HiOutlineCheckBadge} color="indigo" />
        <StatCard title="Placed Students" value={data.stats.placed} icon={HiOutlineBriefcase} color="green" />
        <StatCard title="Avg Skill Score" value={data.stats.avgSkillScore + '%'} icon={HiOutlineChartBar} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <BarChart data={data.topSkills} title="Top Skills Distribution" color="#4f46e5" xKey="name" yKey="value" />
        </Card>
        <Card className="p-6">
          <PieChart data={data.journeyStage} title="Journey Stage Distribution" colors={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <LineChart data={data.placements} title="Placement Trend (Last 6 Months)" xKey="name" lines={[{ key: 'value', color: '#10b981', name: 'Placements' }]} />
        </Card>

        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Skill Gap Alert</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
                <tr>
                  <th className="px-4 py-2">Skill</th>
                  <th className="px-4 py-2">Students</th>
                  <th className="px-4 py-2">Severity</th>
                </tr>
              </thead>
              <tbody>
                {data.skillGaps.map(gap => (
                  <tr key={gap.id} className="border-b">
                    <td className="px-4 py-3 font-medium">{gap.skill}</td>
                    <td className="px-4 py-3 text-gray-500">{gap.count}</td>
                    <td className="px-4 py-3">
                      <Badge variant={gap.severity === 'High' ? 'danger' : 'warning'}>{gap.severity}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Student Activity</h3>
        <div className="space-y-4">
          {data.recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-gray-900">{activity.student}</p>
                <p className="text-sm text-gray-500">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
