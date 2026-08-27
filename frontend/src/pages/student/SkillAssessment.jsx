import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assessment, students } from '../../api/client';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SkillProfile from '../../components/features/SkillProfile';
import QuestionCard from '../../components/features/QuestionCard';
import { HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineCpuChip } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const DOMAIN_OPTIONS = [
  { id: 'Full Stack', name: 'Full Stack Web Development', desc: 'JavaScript, React, FastAPI, SQL, REST APIs', icon: '🌐' },
  { id: 'Python', name: 'Python Core & Advanced', desc: 'OOP, Functional Programming, GIL, Concurrency', icon: '🐍' },
  { id: 'React', name: 'React & Modern Frontend', desc: 'Hooks, Virtual DOM, State Management, Next.js', icon: '⚛️' },
  { id: 'DSA', name: 'Data Structures & Algorithms', desc: 'Trees, Graphs, Sorting, Dynamic Programming', icon: '⚡' }
];

const SkillAssessment = () => {
  const { user } = useAuth();
  const studentId = user?.student_id || user?.id;

  const [activeTab, setActiveTab] = useState('take'); // 'take' or 'results'
  const [status, setStatus] = useState('setup'); // 'setup', 'in-progress', 'completed'
  const [selectedTopic, setSelectedTopic] = useState('Full Stack');
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    let timer;
    if (status === 'in-progress' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && status === 'in-progress') {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  useEffect(() => {
    if (activeTab === 'results' && !results && studentId) {
      fetchResults();
    }
  }, [activeTab, studentId]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await assessment.getResult(studentId);
      setResults(res.data || res);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    } finally {
      setLoading(false);
    }
  };

  const startAssessment = async () => {
    try {
      setLoading(true);
      const res = await assessment.getQuestions(selectedTopic);
      const fetchedQuestions = res.data || res || [];
      setQuestions(fetchedQuestions);
      setStatus('in-progress');
      setTimeLeft(15 * 60);
      setCurrentAnswers({});
      toast.success(`Starting ${selectedTopic} Assessment!`);
    } catch (err) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await assessment.submit({ 
        student_id: studentId, 
        topic: selectedTopic,
        answers: currentAnswers,
        questions: questions
      });
      const resultData = res.data || res;
      setResults(resultData);
      
      // Update student profile with verified score
      if (studentId) {
        await students.updateProfile(studentId, {
          verified_score: resultData.score,
          journey_stage: 'Practice'
        }).catch(() => {});
      }
      
      toast.success(`Assessment completed! Your verified score is ${resultData.score}/100.`);
      setStatus('completed');
      setActiveTab('results');
    } catch (err) {
      toast.error('Failed to submit assessment');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiOutlineCpuChip className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          AI Skill Assessment & Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm">Select your language or engineering domain to benchmark and verify your technical skills.</p>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'take' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('take')}
        >
          Take Assessment
        </button>
        <button
          className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'results' 
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('results')}
        >
          My Assessment Results
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner />
          <span className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-semibold animate-pulse">Evaluating questions & synchronizing profile...</span>
        </div>
      )}

      {!loading && activeTab === 'take' && (
        <div className="space-y-6">
          {status === 'setup' && (
            <Card title="Step 1: Choose Your Assessment Domain">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
                Choose the technical stack you want to test. Our AI engine generates adaptive multiple-choice questions tailored to that specialization.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DOMAIN_OPTIONS.map((dom) => (
                  <div
                    key={dom.id}
                    onClick={() => setSelectedTopic(dom.id)}
                    className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedTopic === dom.id
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md'
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-850 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-2xl">{dom.icon}</span>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">{dom.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pl-9">{dom.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  ⏱️ <strong>Format:</strong> 5 Multiple-Choice Questions | 15 Minutes Duration | Auto-saves to Profile
                </div>
                <button
                  onClick={startAssessment}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  Start {selectedTopic} Test →
                </button>
              </div>
            </Card>
          )}

          {status === 'in-progress' && (
            <div className="space-y-6">
              <div className="sticky top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 z-10 flex justify-between items-center">
                <div className="flex-1 mr-8">
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span>Progress ({Object.keys(currentAnswers).length} of {questions.length} answered)</span>
                    <span>{Math.round((Object.keys(currentAnswers).length / Math.max(questions.length, 1)) * 100)}%</span>
                  </div>
                  <ProgressBar progress={(Object.keys(currentAnswers).length / Math.max(questions.length, 1)) * 100} />
                </div>
                <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-3.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="space-y-5">
                {questions.map((q, idx) => (
                  <QuestionCard 
                    key={q.id || idx} 
                    question={q} 
                    number={idx + 1}
                    value={currentAnswers[q.id || idx]}
                    onChange={(val) => handleAnswerChange(q.id || idx, val)}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button 
                  onClick={handleSubmit} 
                  disabled={Object.keys(currentAnswers).length === 0}
                  size="lg"
                >
                  Submit & Compute Verified Score
                </Button>
              </div>
            </div>
          )}

          {status === 'completed' && (
            <Card className="text-center py-12">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Assessment Submitted!</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Your answers have been graded and synced with your verified profile.</p>
              <Button onClick={() => setActiveTab('results')}>View Detailed Results & Radar</Button>
            </Card>
          )}
        </div>
      )}

      {!loading && activeTab === 'results' && results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card title={`Skill Assessment Radar: ${results.topic || selectedTopic}`}>
              <div className="h-72">
                <SkillProfile data={results.skills || []} />
              </div>
            </Card>
            
            <Card title="Improvement & Growth Areas">
              <ul className="space-y-3">
                {(results.gaps || []).map((gap, i) => (
                  <li key={i} className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl">
                    <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">{gap.skill}</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">{gap.suggestion}</p>
                  </li>
                ))}
                {(!results.gaps || results.gaps.length === 0) && (
                  <p className="text-xs text-gray-500">No critical skill gaps identified. Outstanding execution!</p>
                )}
              </ul>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="text-center py-8">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Verified Skill Score</span>
              <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                {results.score}<span className="text-xl text-gray-400 font-normal">/100</span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center justify-center gap-1">
                <HiOutlineCheckCircle className="w-4 h-4" /> Benchmark verified in database
              </p>
            </Card>

            <Card title="Competency Breakdown">
              <div className="space-y-4">
                {(results.skills || []).map((skill, idx) => {
                  const score = skill.score || 0;
                  const colorClass = score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500';
                  return (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1.5 font-semibold">
                        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className={`${colorClass} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <button 
              onClick={() => { setStatus('setup'); setActiveTab('take'); }} 
              className="w-full py-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all"
            >
              Take Assessment in Another Language / Domain →
            </button>
          </div>
        </div>
      )}

      {!loading && activeTab === 'results' && !results && (
        <Card className="text-center py-12">
          <p className="text-xs text-gray-500 mb-4">No results found yet. Take an assessment to compute your verified skill score.</p>
          <Button onClick={() => { setStatus('setup'); setActiveTab('take'); }}>Start Assessment</Button>
        </Card>
      )}
    </div>
  );
};

export default SkillAssessment;
