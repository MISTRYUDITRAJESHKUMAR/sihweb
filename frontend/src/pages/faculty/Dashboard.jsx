import React from 'react';
import { HiOutlineAcademicCap, HiOutlineBeaker, HiOutlineDocumentText, HiOutlineUserGroup } from 'react-icons/hi2';
import { Card, StatCard, Badge, Button } from '../../components/common';
import { useAuth } from '../../context/AuthContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const facultyName = user?.name || 'Dr. Sharma';

  const stats = [
    { title: 'Available Opportunities', value: 12, icon: HiOutlineAcademicCap, color: 'indigo' },
    { title: 'Applied', value: 3, icon: HiOutlineDocumentText, color: 'blue' },
    { title: 'Active Collaborations', value: 2, icon: HiOutlineUserGroup, color: 'green' },
    { title: 'Research Projects', value: 1, icon: HiOutlineBeaker, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {facultyName}</h1>
          <p className="text-gray-500 mt-1">Department of Computer Science | Specialization: AI & Machine Learning</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="primary">AI Certified Faculty</Badge>
          <Badge variant="success">Industry Mentor</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recommended Opportunities</h3>
            <a href="/faculty/opportunities" className="text-indigo-600 hover:underline text-sm">View All</a>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="purple">FDP</Badge>
                <span className="text-xs text-gray-500">Closes in 5 days</span>
              </div>
              <h4 className="font-semibold text-gray-900">Advanced Generative AI for Educators</h4>
              <p className="text-sm text-gray-600 mt-1">Organized by Google Cloud | Online | 5 Days</p>
              <div className="mt-3">
                <Button variant="secondary" className="w-full text-sm py-1.5">Apply Now</Button>
              </div>
            </div>
            <div className="border border-gray-100 rounded-lg p-4 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="blue">Industrial Training</Badge>
                <span className="text-xs text-gray-500">Closes in 12 days</span>
              </div>
              <h4 className="font-semibold text-gray-900">AWS Cloud Architecture Deep Dive</h4>
              <p className="text-sm text-gray-600 mt-1">Organized by Amazon | On-site | 2 Weeks</p>
              <div className="mt-3">
                <Button variant="secondary" className="w-full text-sm py-1.5">Apply Now</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Active Collaborations</h3>
            <a href="/faculty/research" className="text-indigo-600 hover:underline text-sm">Manage</a>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 items-center p-3 rounded-lg bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <HiOutlineUserGroup size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Student Mentorship: TechCorp Hackathon</h4>
                <p className="text-sm text-gray-600">Mentoring 4 teams | Status: Ongoing</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-3 rounded-lg bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <HiOutlineBeaker size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">NLP Resource Optimization Research</h4>
                <p className="text-sm text-gray-600">Partner: InnovaSys | Status: Paper Drafting</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
