import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jobs } from '../../api/client';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import JobCard from '../../components/features/JobCard';
import { HiOutlineMagnifyingGlass, HiOutlineBriefcase } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Jobs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const studentId = user?.student_id || user?.id;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const [recRes, allRes, appsRes] = await Promise.all([
        jobs.getRecommended(studentId).catch(() => ({ data: [] })),
        jobs.getAll({}).catch(() => ({ data: [] })),
        jobs.getApplications(studentId).catch(() => ({ data: [] }))
      ]);
      
      const fetchedJobs = allRes.data || allRes || [];
      const fetchedRec = recRes.data || recRes || [];
      const apps = appsRes.data || appsRes || [];
      
      setAllJobs(fetchedJobs);
      setRecommendedJobs(fetchedRec);
      
      const appliedIds = new Set(apps.map(a => String(a.job_id || a.id)));
      setAppliedJobIds(appliedIds);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const handleApply = async (jobId) => {
    if (!studentId) {
      toast.error('Please log in as a student to apply');
      return;
    }
    try {
      await jobs.apply(jobId, studentId);
      toast.success('Application submitted successfully!');
      setAppliedJobIds(prev => new Set(prev).add(String(jobId)));
    } catch (err) {
      toast.error('Failed to submit application');
    }
  };

  const filteredJobs = allJobs.filter(job => {
    const title = job.title || job.role || '';
    const company = job.company_name || job.company || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiOutlineBriefcase className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          Jobs & Internships Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm">Explore verified opportunities posted by industry partners.</p>
      </div>

      <Card className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by role, company, or skills..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Job">Full-time Job</option>
          <option value="Internship">Internship</option>
          <option value="Apprenticeship">Apprenticeship</option>
        </select>
      </Card>

      {/* AI Recommended */}
      {recommendedJobs.length > 0 && searchTerm === '' && typeFilter === 'All' && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
            <span>✨</span> AI Recommended for Your Skill Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={() => handleApply(job.id)} 
                isApplied={appliedJobIds.has(String(job.id))}
                highlight
              />
            ))}
          </div>
        </div>
      )}

      {/* All Listings */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">All Industry Postings</h2>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={() => handleApply(job.id)} 
                isApplied={appliedJobIds.has(String(job.id))}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <HiOutlineBriefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">No Job Postings Yet</h3>
            <p className="text-gray-500 text-xs mt-1 max-w-sm mx-auto">
              Industry recruiters can log in and post openings. Once published, real opportunities will show up here instantly!
            </p>
          </Card>
        )}
      </div>

    </div>
  );
};

export default Jobs;
