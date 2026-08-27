import React, { useState, useEffect } from 'react';
import { HiOutlineBriefcase, HiOutlineCurrencyRupee, HiOutlineArrowTrendingUp, HiOutlineAcademicCap } from 'react-icons/hi2';
import { college } from '../../api/client';
import { Card, StatCard, LoadingSpinner, Badge } from '../../components/common';
import { BarChart, PieChart, LineChart } from '../../components/charts';
import { toast } from 'react-hot-toast';

export default function Placements() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mock Data
        setData({
          stats: { totalPlaced: 450, placementRate: '82%', avgPackage: '7.5 LPA', topPackage: '32 LPA' },
          companies: [
            { name: 'TCS', value: 120 }, { name: 'Infosys', value: 95 },
            { name: 'Amazon', value: 15 }, { name: 'Microsoft', value: 5 },
            { name: 'Startups', value: 215 }
          ],
          departments: [
            { name: 'CSE', value: 210 }, { name: 'IT', value: 140 },
            { name: 'ECE', value: 65 }, { name: 'EEE', value: 35 }
          ],
          trend: [
            { name: '2021', value: 65 }, { name: '2022', value: 72 },
            { name: '2023', value: 78 }, { name: '2024', value: 82 }
          ],
          topRecruiters: [
            { name: 'Amazon', hires: 15, avgPackage: '24 LPA' },
            { name: 'Microsoft', hires: 5, avgPackage: '32 LPA' },
            { name: 'TCS Digital', hires: 45, avgPackage: '7.5 LPA' },
            { name: 'Infosys Power Programmer', hires: 25, avgPackage: '8 LPA' }
          ],
          awaiting: [
            { id: 1, name: 'Siddharth Rao', branch: 'CSE', score: 88, status: 'In Interview' },
            { id: 2, name: 'Neha Gupta', branch: 'IT', score: 85, status: 'Shortlisted' },
            { id: 3, name: 'Karan Singh', branch: 'ECE', score: 79, status: 'Applying' }
          ]
        });
      } catch (error) {
        toast.error('Failed to load placement data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Placement Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Placed" value={data.stats.totalPlaced} icon={HiOutlineBriefcase} color="indigo" />
        <StatCard title="Placement Rate" value={data.stats.placementRate} icon={HiOutlineArrowTrendingUp} color="green" />
        <StatCard title="Average Package" value={data.stats.avgPackage} icon={HiOutlineCurrencyRupee} color="blue" />
        <StatCard title="Top Package" value={data.stats.topPackage} icon={HiOutlineAcademicCap} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <PieChart data={data.companies} title="Placements by Company" colors={['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#6b7280']} />
        </Card>
        <Card className="p-6">
          <BarChart data={data.departments} title="Placements by Department" color="#3b82f6" xKey="name" yKey="value" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <LineChart data={data.trend} title="Year-over-Year Placement Trend (%)" xKey="name" lines={[{ key: 'value', color: '#8b5cf6', name: 'Placement %' }]} />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Recruiters</h3>
          <div className="space-y-4">
            {data.topRecruiters.map((recruiter, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{recruiter.name}</p>
                  <p className="text-xs text-gray-500">{recruiter.hires} students hired</p>
                </div>
                <div className="text-sm font-semibold text-green-600">{recruiter.avgPackage}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Students Awaiting Placement</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">AI Skill Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.awaiting.map(student => (
                <tr key={student.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-3 text-gray-600">{student.branch}</td>
                  <td className="px-4 py-3 font-semibold text-indigo-600">{student.score}</td>
                  <td className="px-4 py-3">
                    <Badge variant={student.status === 'In Interview' ? 'warning' : student.status === 'Shortlisted' ? 'success' : 'secondary'}>
                      {student.status}
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
