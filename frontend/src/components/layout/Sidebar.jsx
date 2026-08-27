import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineChartPie, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineCodeBracket, HiOutlineMicrophone, HiOutlineTrophy } from 'react-icons/hi2';
import { useAuth } from '../../context/AuthContext';

const navConfig = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: HiOutlineChartPie },
    { label: 'Skill Assessment', path: '/student/assessment', icon: HiOutlineDocumentText },
    { label: 'Career Guidance', path: '/student/career', icon: HiOutlineAcademicCap },
    { label: 'Learning', path: '/student/learning', icon: HiOutlineTrophy },
    { label: 'Coding Arena', path: '/student/coding', icon: HiOutlineCodeBracket },
    { label: 'AI Interview', path: '/student/interview', icon: HiOutlineMicrophone },
    { label: 'Jobs & Internships', path: '/student/jobs', icon: HiOutlineBriefcase },
    { label: 'My Applications', path: '/student/applications', icon: HiOutlineDocumentText },
    { label: 'My Portfolio', path: '/student/portfolio', icon: HiOutlineUserGroup },
  ],
  college: [
    { label: 'Dashboard', path: '/college/dashboard', icon: HiOutlineChartPie },
    { label: 'Student Progress', path: '/college/students', icon: HiOutlineUserGroup },
    { label: 'Skill Analytics', path: '/college/skills', icon: HiOutlineAcademicCap },
    { label: 'Placements', path: '/college/placements', icon: HiOutlineBriefcase },
    { label: 'Collaborations', path: '/college/collaborations', icon: HiOutlineDocumentText },
  ],
  faculty: [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: HiOutlineChartPie },
    { label: 'Opportunities', path: '/faculty/opportunities', icon: HiOutlineBriefcase },
    { label: 'Research', path: '/faculty/research', icon: HiOutlineDocumentText },
  ],
  industry: [
    { label: 'Dashboard', path: '/industry/dashboard', icon: HiOutlineChartPie },
    { label: 'Post Job', path: '/industry/post-job', icon: HiOutlineBriefcase },
    { label: 'Find Candidates', path: '/industry/candidates', icon: HiOutlineUserGroup },
    { label: 'Programs', path: '/industry/programs', icon: HiOutlineAcademicCap },
    { label: 'Recruitment', path: '/industry/recruitment', icon: HiOutlineDocumentText },
  ]
};

const Sidebar = ({ role }) => {
  const { logout } = useAuth();
  const links = navConfig[role?.toLowerCase()] || [];

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-sm transition-colors">
      <div className="p-6 font-extrabold text-2xl tracking-tight border-b border-gray-100 dark:border-gray-800 z-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <HiOutlineAcademicCap className="w-5 h-5" />
        </div>
        <span className="text-gray-900 dark:text-white">SyncSpace</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 z-10 custom-scrollbar">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-semibold transition-all duration-200 mx-2 rounded-xl mb-1 ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  {link.label}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      <div className="p-6 border-t border-gray-100 dark:border-gray-800 z-10">
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-medium uppercase tracking-wider">SyncSpace Platform</div>
        <button
          onClick={logout}
          className="w-full py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
