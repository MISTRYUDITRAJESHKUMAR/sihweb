import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { students, jobs } from '../../api/client';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import JourneyTracker from '../../components/features/JourneyTracker';
import JobCard from '../../components/features/JobCard';
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const studentId = user?.student_id || user?.id;
      if (!studentId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [profileRes, jobsRes] = await Promise.all([
          students.getProfile(studentId).catch(() => ({ data: {} })),
          jobs.getRecommended(studentId).catch(() => ({ data: [] }))
        ]);
        setProfileData(profileRes.data || profileRes || {});
        setRecommendedJobs(jobsRes.data || jobsRes || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <LoadingSpinner />
      </div>
    );
  }

  const {
    verified_score = 0,
    journey_stage = 'Learn',
    courses_enrolled = 0,
    target_role = 'Full Stack Developer',
    roadmap_progress = 25,
    roadmap = [],
    solved_problems = []
  } = profileData || {};

  const journeySteps = ['Learn', 'Practice', 'Assess', 'Code', 'Mock Interview', 'Verify', 'Improve', 'Get Hired'];
  const currentStageIndex = Math.max(0, journeySteps.indexOf(journey_stage));

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 dark:from-gray-900 dark:via-indigo-950 dark:to-black text-white p-8 rounded-3xl shadow-lg border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-3 border border-white/10">
            <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-400" />
            AI-Driven Career Dashboard
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name}!</h1>
          <p className="text-indigo-200 text-sm mt-1 max-w-xl">
            Track your skill assessments, solve coding problems, and prepare for industry placements with verified score benchmarks.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Verified Skill Score"
          value={verified_score > 0 ? `${verified_score}/100` : 'Not Assessed'}
          icon={HiOutlineChartBar}
          color="indigo"
        />
        <StatCard
          label="Current Journey Stage"
          value={journey_stage}
          icon={HiOutlineAcademicCap}
          color="blue"
        />
        <StatCard
          label="Solved Coding Challenges"
          value={solved_problems ? solved_problems.length : 0}
          icon={HiOutlineDocumentText}
          color="green"
        />
        <StatCard
          label="Target Role"
          value={target_role}
          icon={HiOutlineBriefcase}
          color="orange"
        />
      </div>

      {/* Journey Tracker */}
      <Card title="Your Career & Learning Journey">
        <JourneyTracker steps={journeySteps} currentStep={currentStageIndex} />
      </Card>

      {/* AI Career Roadmap */}
      <Card title={`AI Career Roadmap: ${target_role}`}>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1.5 font-medium">
            <span className="text-gray-700 dark:text-gray-300">Target Preparation Progress</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{roadmap_progress}%</span>
          </div>
          <ProgressBar progress={roadmap_progress} color="bg-indigo-600" />
        </div>
        
        {roadmap && roadmap.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40 hover:border-indigo-200 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Step {idx + 1}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
                      {step.status || 'Pending'}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 gap-4">
            <div>
              <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">Personalized AI Roadmap Ready to Generate</h4>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">Let Gemini build your custom milestone-by-milestone preparation roadmap.</p>
            </div>
            <button 
              onClick={() => navigate('/student/career')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              Generate AI Roadmap →
            </button>
          </div>
        )}
      </Card>

      {/* Action Cards with HIGH CONTRAST Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coding Environment */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-7 rounded-3xl shadow-md border border-gray-800 flex flex-col justify-between h-52">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gray-800 text-indigo-400"><HiOutlineDocumentText className="w-5 h-5" /></span>
              <h3 className="text-xl font-bold">Coding Arena</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Solve algorithmic challenges in Python, JavaScript, and Java to earn verified skill points.
            </p>
          </div>
          <div>
            <button 
              onClick={() => navigate('/student/coding')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-900 hover:bg-gray-100 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Launch Coding Arena</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Adaptive Interview */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 text-white p-7 rounded-3xl shadow-md border border-indigo-500/50 flex flex-col justify-between h-52">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-white/20 text-white"><HiOutlineAcademicCap className="w-5 h-5" /></span>
              <h3 className="text-xl font-bold">AI Mock Interview</h3>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Practice real-time adaptive technical and behavioral interviews with conversational AI feedback.
            </p>
          </div>
          <div>
            <button 
              onClick={() => navigate('/student/interview')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Start Mock Interview</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Industry Opportunities</h2>
          <button onClick={() => navigate('/student/jobs')} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All Opportunities →
          </button>
        </div>
        {recommendedJobs && recommendedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedJobs.slice(0, 3).map(job => (
              <JobCard key={job.id} job={job} onApply={() => navigate(`/student/jobs`)} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-10">
            <p className="text-gray-500 text-sm">No industry jobs posted yet. When recruiters post opportunities, they will be matched here based on your verified skills!</p>
          </Card>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;
