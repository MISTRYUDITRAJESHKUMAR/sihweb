import React, { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { college } from '../../api/client';
import { Card, Button, Badge, ProgressBar, SkillTag, LoadingSpinner } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function StudentProgress() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Mock data
        const mockStudents = [
          {
            id: 1, name: 'Rahul Sharma', branch: 'Computer Science', year: '3rd Year',
            targetRole: 'Full Stack Developer', stage: 'Job Ready', score: 85, progress: 90,
            skills: ['React', 'Node.js', 'MongoDB', 'AWS'], gaps: ['System Design', 'Docker'],
            feedback: 'Excellent progress in frontend technologies. Needs more exposure to backend deployments.',
            certs: 2
          },
          {
            id: 2, name: 'Priya Patel', branch: 'Information Technology', year: '4th Year',
            targetRole: 'Data Scientist', stage: 'Project Building', score: 72, progress: 65,
            skills: ['Python', 'SQL', 'Pandas', 'Machine Learning'], gaps: ['Deep Learning', 'MLOps'],
            feedback: 'Strong analytical skills. Recommended to build more end-to-end projects.',
            certs: 1
          },
          {
            id: 3, name: 'Amit Kumar', branch: 'Computer Science', year: '2nd Year',
            targetRole: 'Frontend Developer', stage: 'Learning', score: 45, progress: 30,
            skills: ['HTML/CSS', 'JavaScript'], gaps: ['React', 'State Management'],
            feedback: 'Good fundamentals. Should start learning a modern frontend framework.',
            certs: 0
          },
          {
            id: 4, name: 'Sneha Reddy', branch: 'Electronics', year: '3rd Year',
            targetRole: 'IoT Engineer', stage: 'Exploring', score: 38, progress: 20,
            skills: ['C++', 'Arduino'], gaps: ['Networking', 'Cloud IoT'],
            feedback: 'Needs to focus on core networking concepts and basic cloud connectivity.',
            certs: 0
          }
        ];
        setStudents(mockStudents);
      } catch (error) {
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleExport = () => {
    toast.success('Report Generated Successfully');
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Job Ready': return 'success';
      case 'Project Building': return 'primary';
      case 'Learning': return 'warning';
      default: return 'secondary';
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: students.length,
    active: students.filter(s => s.score >= 50).length,
    verified: students.filter(s => s.stage === 'Job Ready').length,
    atRisk: students.filter(s => s.score < 40).length
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Student Progress Tracker</h1>
        <Button onClick={handleExport} variant="primary">Export Report</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Active Learners</p>
          <p className="text-2xl font-bold text-indigo-600">{stats.active}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Job Ready (Verified)</p>
          <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
        </Card>
        <Card className="p-4 text-center border-l-4 border-red-500">
          <p className="text-sm text-gray-500">At Risk (Score &lt; 40)</p>
          <p className="text-2xl font-bold text-red-500">{stats.atRisk}</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Target Role</th>
                <th className="px-6 py-3 font-medium">Branch</th>
                <th className="px-6 py-3 font-medium">Journey Stage</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(expandedRow === student.id ? null : student.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.year}</div>
                    </td>
                    <td className="px-6 py-4">{student.targetRole}</td>
                    <td className="px-6 py-4">{student.branch}</td>
                    <td className="px-6 py-4">
                      <Badge variant={getStageColor(student.stage)}>{student.stage}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${student.score >= 70 ? 'text-green-600' : student.score < 40 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {student.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <ProgressBar progress={student.progress} color={student.progress > 75 ? 'bg-green-500' : 'bg-indigo-500'} />
                    </td>
                  </tr>
                  {expandedRow === student.id && (
                    <tr className="bg-indigo-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Acquired Skills</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {student.skills.map(skill => <SkillTag key={skill} skill={skill} />)}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Skill Gaps</h4>
                            <div className="flex flex-wrap gap-2">
                              {student.gaps.map(gap => <SkillTag key={gap} skill={gap} className="bg-red-100 text-red-800" />)}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">AI Feedback</h4>
                            <p className="text-sm text-gray-700 italic border-l-4 border-indigo-300 pl-3 py-1">"{student.feedback}"</p>
                            <div className="mt-4 flex items-center gap-2">
                              <span className="font-medium">Certifications:</span>
                              <Badge variant="secondary">{student.certs} Earned</Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
