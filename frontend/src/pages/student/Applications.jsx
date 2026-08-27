import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jobs } from '../../api/client';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineClock, HiOutlineCheckCircle, HiOutlineStar } from 'react-icons/hi2';

const Applications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = user?.student_id || user?.id;

  useEffect(() => {
    const fetchApps = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await jobs.getApplications(studentId).catch(() => ({ data: [] }));
        setApplications(res.data || res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return <Badge color="blue">Applied</Badge>;
      case 'under review': return <Badge color="yellow">Under Review</Badge>;
      case 'shortlisted': return <Badge color="indigo">Shortlisted</Badge>;
      case 'selected': return <Badge color="green">Selected</Badge>;
      case 'rejected': return <Badge color="red">Rejected</Badge>;
      default: return <Badge color="gray">{status || 'Submitted'}</Badge>;
    }
  };

  const stats = {
    total: applications.length,
    underReview: applications.filter(a => a.status?.toLowerCase() === 'under review').length,
    shortlisted: applications.filter(a => a.status?.toLowerCase() === 'shortlisted').length,
    selected: applications.filter(a => a.status?.toLowerCase() === 'selected').length
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Job & Internship Applications</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm">Track real-time status of your applications submitted to industry partners.</p>
      </div>

      {applications.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Submitted" value={stats.total} icon={HiOutlineDocumentText} color="blue" />
            <StatCard label="Under Review" value={stats.underReview} icon={HiOutlineClock} color="orange" />
            <StatCard label="Shortlisted" value={stats.shortlisted} icon={HiOutlineStar} color="indigo" />
            <StatCard label="Offers / Selected" value={stats.selected} icon={HiOutlineCheckCircle} color="green" />
          </div>

          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 text-xs uppercase font-bold tracking-wider">
                    <th className="p-4">Company</th>
                    <th className="p-4">Role Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Applied Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 font-bold text-sm text-gray-900 dark:text-white">{app.company || app.job?.company_name || 'Enterprise'}</td>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{app.role || app.job?.title || 'Software Engineer'}</td>
                      <td className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{app.type || 'Internship'}</td>
                      <td className="p-4 text-xs text-gray-500 dark:text-gray-400">{app.date || app.applied_date || 'Recently'}</td>
                      <td className="p-4">{getStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card className="text-center py-16">
          <HiOutlineDocumentText className="w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Applications Submitted Yet</h2>
          <p className="text-gray-500 text-xs mb-6 max-w-sm mx-auto">You haven't applied to any job postings yet. Explore open industry listings and submit applications with one click.</p>
          <button 
            onClick={() => navigate('/student/jobs')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            Browse Open Opportunities →
          </button>
        </Card>
      )}
    </div>
  );
};

export default Applications;
