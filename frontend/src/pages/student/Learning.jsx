import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../api/client';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SkillTag from '../../components/common/SkillTag';
import ProgressBar from '../../components/common/ProgressBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HiOutlineMagnifyingGlass, HiOutlinePlayCircle, HiOutlineBookOpen, HiOutlineAcademicCap, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CURATED_COURSES = [
  {
    id: 1,
    title: 'Full Stack Web Development Bootcamp 2026',
    provider: 'FreeCodeCamp (YouTube)',
    type: 'Video',
    difficulty: 'Beginner',
    duration: '22 hours',
    url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js']
  },
  {
    id: 2,
    title: 'Python for Beginners to Advanced (Complete Series)',
    provider: 'CodeWithHarry (YouTube)',
    type: 'Video',
    difficulty: 'Beginner',
    duration: '14 hours',
    url: 'https://www.youtube.com/watch?v=7wnove7K-ZQ',
    skills: ['Python', 'OOP', 'Data Structures', 'File Handling']
  },
  {
    id: 3,
    title: 'React JS & Next.js Masterclass with Projects',
    provider: 'Chai aur Code (YouTube)',
    type: 'Video',
    difficulty: 'Intermediate',
    duration: '18 hours',
    url: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige',
    skills: ['React', 'Hooks', 'Redux Toolkit', 'Tailwind CSS']
  },
  {
    id: 4,
    title: 'FastAPI High-Performance Backend Course',
    provider: 'Traversy Media / YouTube',
    type: 'Video',
    difficulty: 'Intermediate',
    duration: '6 hours',
    url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
    skills: ['FastAPI', 'Python', 'Pydantic', 'JWT Auth', 'MongoDB']
  },
  {
    id: 5,
    title: 'Data Structures and Algorithms in C++ / Java',
    provider: 'Striver A2Z DSA Course',
    type: 'Course',
    difficulty: 'Advanced',
    duration: '45 hours',
    url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    skills: ['Binary Trees', 'Graphs', 'Dynamic Programming', 'Recursion']
  },
  {
    id: 6,
    title: 'AWS Certified Cloud Practitioner Training',
    provider: 'Amazon Web Services / YouTube',
    type: 'Certification',
    difficulty: 'Beginner',
    duration: '12 hours',
    url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
    skills: ['AWS EC2', 'S3', 'IAM', 'Cloud Architecture']
  },
  {
    id: 7,
    title: 'Docker & Kubernetes Mastery from Scratch',
    provider: 'TechWorld with Nana',
    type: 'Video',
    difficulty: 'Intermediate',
    duration: '8 hours',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    skills: ['Docker', 'Containers', 'Kubernetes', 'CI/CD']
  },
  {
    id: 8,
    title: 'System Design for Technical Interviews',
    provider: 'Educative / Donne Martin',
    type: 'Course',
    difficulty: 'Advanced',
    duration: '20 hours',
    url: 'https://github.com/donnemartin/system-design-primer',
    skills: ['System Design', 'Caching', 'Load Balancing', 'Microservices']
  }
];

const Learning = () => {
  const { user } = useAuth();
  const studentId = user?.student_id || user?.id;

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [diffFilter, setDiffFilter] = useState('All');
  
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(`syncspace_enrolled_${studentId}`);
      return saved ? JSON.parse(saved) : [CURATED_COURSES[0], CURATED_COURSES[2]];
    } catch {
      return [CURATED_COURSES[0], CURATED_COURSES[2]];
    }
  });

  const handleEnroll = async (course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      const updated = [...enrolledCourses, { ...course, progress: 20 }];
      setEnrolledCourses(updated);
      try {
        localStorage.setItem(`syncspace_enrolled_${studentId}`, JSON.stringify(updated));
        if (studentId) {
          await courses.enroll(course.id, studentId).catch(() => {});
        }
      } catch (e) {}
      toast.success(`Enrolled in "${course.title}"!`);
    }
    // Open course URL
    if (course.url) {
      window.open(course.url, '_blank');
    }
  };

  const filteredCourses = CURATED_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'All' || course.type === typeFilter;
    const matchesDiff = diffFilter === 'All' || course.difficulty === diffFilter;
    return matchesSearch && matchesType && matchesDiff;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiOutlinePlayCircle className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          Learning Hub & Curated Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm">Access top-rated YouTube full courses, hands-on tutorials, and official documentation.</p>
      </div>

      {/* Filter Bar */}
      <Card className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, skills (e.g. React, Python, Docker)..."
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
          <option value="All">All Formats</option>
          <option value="Video">YouTube Lectures</option>
          <option value="Course">Interactive Courses</option>
          <option value="Certification">Certification Guides</option>
        </select>
        <select
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none"
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </Card>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Active Enrollments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, idx) => (
              <Card key={idx} className="flex flex-col justify-between h-full border-l-4 border-l-indigo-600">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{course.provider}</span>
                    <Badge color="green">In Progress</Badge>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-xs mb-1.5 font-semibold">
                    <span>Course Progress</span>
                    <span>{course.progress || 35}%</span>
                  </div>
                  <ProgressBar progress={course.progress || 35} color="bg-indigo-600" />
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Continue on YouTube</span>
                    <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Courses Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Curated Course Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="flex flex-col justify-between h-full hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <HiOutlinePlayCircle className="w-5 h-5 text-rose-500" />
                  </span>
                  <Badge color={course.difficulty === 'Beginner' ? 'green' : course.difficulty === 'Intermediate' ? 'yellow' : 'red'}>
                    {course.difficulty}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-2 mt-1">{course.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.provider}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.skills.map((skill, i) => (
                    <span key={i} className="text-[11px] font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-semibold">{course.duration}</span>
                <button
                  onClick={() => handleEnroll(course)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>Watch & Learn</span>
                  <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;
