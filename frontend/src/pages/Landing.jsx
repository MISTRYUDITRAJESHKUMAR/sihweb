import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineAcademicCap, 
  HiOutlineBriefcase, 
  HiOutlineBuildingLibrary, 
  HiOutlineBolt, 
  HiOutlineCheckBadge, 
  HiOutlineGlobeAlt,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineChartBar
} from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

const Landing = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <HiOutlineAcademicCap className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">SyncSpace</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={toggleTheme} 
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <HiOutlineSun className="w-6 h-6" /> : <HiOutlineMoon className="w-6 h-6" />}
              </button>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-8 border border-indigo-100 dark:border-indigo-800/50">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping absolute"></span>
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 relative"></span>
            Platform Live Now
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-gray-900 dark:text-white mb-2">Bridge the gap between</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Academia & Industry</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto mb-10 font-medium leading-relaxed">
            AI-driven skill mapping, personalized career roadmaps, and a seamless collaboration platform for the next generation of builders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5">
              Join the Network
            </Link>
            <Link to="/login" className="px-8 py-4 border border-gray-200 dark:border-gray-700 text-lg font-bold rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all transform hover:-translate-y-0.5">
              Explore Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Deep Dive Features */}
      <div className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">Key Features</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Everything you need to succeed</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineCpuChip className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Mock Interviews</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Practice with our adaptive AI interviewer. Get real-time feedback on your answers, body language, and technical accuracy before the real thing.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineGlobeAlt className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Personalized Roadmaps</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Tell us your dream role, and our AI maps out the exact steps, courses, and projects you need to get there from your current skill level.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineCodeBracket className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Integrated IDE</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Solve algorithmic challenges and build projects directly in the browser. Your code is verified and added to your unified portfolio automatically.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineCheckBadge className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Verified Skill Scores</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">No more relying just on resumes. Earn verified skill badges by passing standardized assessments that industry partners actually trust.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineChartBar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">College Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Institutions can track student progress in real-time, identify aggregate skill gaps, and tailor their curriculum to industry demand.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineBriefcase className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Evidence-Based Hiring</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Companies can filter candidates based on verified skills and actual project completions, drastically reducing time-to-hire.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Segmentation Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-900 to-gray-900 dark:from-gray-900 dark:to-black rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-gray-800">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CgkJPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgoJPC9zdmc+')] opacity-50"></div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10">One Platform. Infinite Possibilities.</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 relative z-10">Whether you're learning, teaching, or hiring, we have tailored workflows designed specifically for your needs.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <h4 className="font-bold text-xl mb-2 text-indigo-300">Students</h4>
                <p className="text-sm text-gray-300">Learn, build, and get hired.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <h4 className="font-bold text-xl mb-2 text-blue-300">Colleges</h4>
                <p className="text-sm text-gray-300">Monitor and guide success.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <h4 className="font-bold text-xl mb-2 text-emerald-300">Industry</h4>
                <p className="text-sm text-gray-300">Hire verified talent fast.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <h4 className="font-bold text-xl mb-2 text-amber-300">Faculty</h4>
                <p className="text-sm text-gray-300">Collaborate and research.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">© 2026 SyncSpace. Built for the future of education.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
