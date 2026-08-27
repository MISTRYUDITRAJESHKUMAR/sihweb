import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import SkillAssessment from './pages/student/SkillAssessment';
import CareerGuidance from './pages/student/CareerGuidance';
import Learning from './pages/student/Learning';
import CodingArena from './pages/student/CodingArena';
import MockInterview from './pages/student/MockInterview';
import Jobs from './pages/student/Jobs';
import Applications from './pages/student/Applications';
import Portfolio from './pages/student/Portfolio';

// College Pages
import CollegeDashboard from './pages/college/Dashboard';
import StudentProgress from './pages/college/StudentProgress';
import SkillAnalytics from './pages/college/SkillAnalytics';
import Placements from './pages/college/Placements';
import CollegeCollaborations from './pages/college/Collaborations';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import Opportunities from './pages/faculty/Opportunities';
import Research from './pages/faculty/Research';

// Industry Pages
import IndustryDashboard from './pages/industry/Dashboard';
import PostJob from './pages/industry/PostJob';
import Candidates from './pages/industry/Candidates';
import Programs from './pages/industry/Programs';
import Recruitment from './pages/industry/Recruitment';

const RoleRedirect = () => {
  const { role } = useAuth();
  if (role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<Layout />}>
        {/* Auth redirect */}
        <Route path="/dashboard" element={<RoleRedirect />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assessment" element={<SkillAssessment />} />
        <Route path="/student/career" element={<CareerGuidance />} />
        <Route path="/student/learning" element={<Learning />} />
        <Route path="/student/coding" element={<CodingArena />} />
        <Route path="/student/interview" element={<MockInterview />} />
        <Route path="/student/jobs" element={<Jobs />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/student/portfolio" element={<Portfolio />} />

        {/* College Routes */}
        <Route path="/college" element={<Navigate to="/college/dashboard" replace />} />
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/college/students" element={<StudentProgress />} />
        <Route path="/college/skills" element={<SkillAnalytics />} />
        <Route path="/college/placements" element={<Placements />} />
        <Route path="/college/collaborations" element={<CollegeCollaborations />} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/opportunities" element={<Opportunities />} />
        <Route path="/faculty/research" element={<Research />} />

        {/* Industry Routes */}
        <Route path="/industry" element={<Navigate to="/industry/dashboard" replace />} />
        <Route path="/industry/dashboard" element={<IndustryDashboard />} />
        <Route path="/industry/post-job" element={<PostJob />} />
        <Route path="/industry/candidates" element={<Candidates />} />
        <Route path="/industry/programs" element={<Programs />} />
        <Route path="/industry/recruitment" element={<Recruitment />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
