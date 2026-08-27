import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const auth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const students = {
  getProfile: (id) => api.get(`/students/${id}`),
  updateProfile: (id, data) => api.put(`/students/${id}`, data),
  solveProblem: (id, data) => api.post(`/students/${id}/solve-problem`, data),
  getJourney: (id) => api.get(`/students/${id}/journey`),
  getRecommendations: (id) => api.get(`/students/${id}/recommendations`),
};

export const assessment = {
  getQuestions: (skills) => api.get('/assessment/questions', { params: { skills } }),
  submit: (data) => api.post('/assessment/submit', data),
  getResult: (studentId) => api.get(`/assessment/result/${studentId}`),
};

export const career = {
  getRoadmap: (targetRole, currentSkills = [], studentId = null) => 
    api.post('/career/roadmap', { 
      target_role: targetRole, 
      targetRole: targetRole, 
      current_skills: currentSkills, 
      currentSkills: currentSkills,
      student_id: studentId,
      studentId: studentId
    }),
  getGuidance: (studentId) => api.get(`/career/guidance/${studentId}`),
  getSkillsDemand: () => api.get('/career/skills-demand'),
};

export const jobs = {
  getAll: (filters) => api.get('/jobs', { params: filters }),
  create: (data) => api.post('/jobs', data),
  getById: (id) => api.get(`/jobs/${id}`),
  apply: (jobId, studentId) => api.post(`/jobs/${jobId}/apply`, { student_id: studentId, studentId }),
  getRecommended: (studentId) => api.get(`/jobs/recommended/${studentId}`),
  getApplications: (studentId) => api.get(`/jobs/applications/${studentId}`),
};

export const interview = {
  start: (studentId, targetRole) => api.post('/interview/start', { student_id: studentId, studentId, target_role: targetRole, targetRole }),
  answer: (sessionId, answer) => api.post(`/interview/${sessionId}/answer`, { session_id: sessionId, answer }),
  evaluate: (sessionId) => api.post(`/interview/${sessionId}/evaluate`, { session_id: sessionId }),
  getHistory: (studentId) => api.get(`/interview/history/${studentId}`),
};

export const courses = {
  getAll: (filters) => api.get('/courses', { params: filters }),
  getRecommended: (studentId) => api.get(`/courses/recommended/${studentId}`),
  enroll: (courseId, studentId) => api.post(`/courses/${courseId}/enroll`, { student_id: studentId, studentId }),
  getProgress: (studentId) => api.get(`/courses/progress/${studentId}`),
};

export const faculty = {
  getOpportunities: (type) => api.get('/faculty/opportunities', { params: { type } }),
  apply: (oppId) => api.post(`/faculty/opportunities/${oppId}/apply`),
  getCollaborations: () => api.get('/faculty/collaborations'),
  getProfile: (id) => api.get(`/faculty/${id}`),
};

export const college = {
  getDashboard: () => api.get('/college/dashboard'),
  getSkillAnalytics: () => api.get('/college/skills'),
  getPlacementInsights: () => api.get('/college/placements'),
  getStudentProgress: () => api.get('/college/students/progress'),
  getCollaborations: () => api.get('/college/collaborations'),
};

export const industry = {
  getDashboard: () => api.get('/industry/dashboard'),
  getCandidates: () => api.get('/industry/candidates'),
  getCandidate: (id) => api.get(`/industry/candidates/${id}`),
  shortlist: (studentId, jobId) => api.post('/industry/shortlist', { student_id: studentId, studentId, job_id: jobId, jobId }),
  getPrograms: () => api.get('/industry/programs'),
};

export const portfolio = {
  get: (studentId) => api.get(`/portfolio/${studentId}`),
  update: (studentId, data) => api.put(`/portfolio/${studentId}`, data),
  addCertificate: (studentId, cert) => api.post(`/portfolio/${studentId}/certificate`, cert),
  addProject: (studentId, project) => api.post(`/portfolio/${studentId}/project`, project),
  addAchievement: (studentId, achievement) => api.post(`/portfolio/${studentId}/achievement`, achievement),
};

export default api;
