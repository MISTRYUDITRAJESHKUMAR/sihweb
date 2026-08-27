import { HiOutlineBookOpen, HiOutlineCodeBracket, HiOutlineClipboardDocumentCheck, HiOutlineTrophy, HiOutlineMicrophone, HiOutlineCheckBadge, HiOutlineChartBar, HiOutlineBriefcase } from 'react-icons/hi2';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getMatchColor = (percentage) => {
  if (percentage >= 80) return 'green';
  if (percentage >= 50) return 'yellow';
  return 'red';
};

export const truncateText = (text, maxLen) => {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.substr(0, maxLen) + '...';
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export const getJourneyStages = () => [
  { id: 'learn', label: 'Learn', icon: HiOutlineBookOpen, description: 'Acquire new skills' },
  { id: 'practice', label: 'Practice', icon: HiOutlineCodeBracket, description: 'Hands-on practice' },
  { id: 'assess', label: 'Assess', icon: HiOutlineClipboardDocumentCheck, description: 'Test your knowledge' },
  { id: 'code', label: 'Code', icon: HiOutlineTrophy, description: 'Solve coding challenges' },
  { id: 'interview', label: 'Mock Interview', icon: HiOutlineMicrophone, description: 'Practice with AI' },
  { id: 'verify', label: 'Verify', icon: HiOutlineCheckBadge, description: 'Earn verified badges' },
  { id: 'improve', label: 'Improve', icon: HiOutlineChartBar, description: 'Fill skill gaps' },
  { id: 'hired', label: 'Get Hired', icon: HiOutlineBriefcase, description: 'Apply for jobs' }
];

export const getRoleColor = (role) => {
  switch (role?.toLowerCase()) {
    case 'student': return 'indigo';
    case 'college': return 'blue';
    case 'faculty': return 'purple';
    case 'industry': return 'green';
    default: return 'gray';
  }
};

export const calculateSkillMatch = (studentSkills = [], requiredSkills = []) => {
  if (!requiredSkills.length) return 100;
  const matchCount = requiredSkills.filter(req => studentSkills.includes(req)).length;
  return Math.round((matchCount / requiredSkills.length) * 100);
};
