import React, { useState, useEffect } from 'react';
import { career, students } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import RoadmapTimeline from '../../components/features/RoadmapTimeline';
import BarChart from '../../components/charts/BarChart';
import { HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlinePlayCircle, HiOutlineArrowTopRightOnSquare, HiOutlineSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const CareerGuidance = () => {
  const { user } = useAuth();
  const studentId = user?.student_id || user?.id;
  const storageKey = studentId ? `syncspace_roadmap_${studentId}` : 'syncspace_roadmap_default';

  const [targetRole, setTargetRole] = useState(user?.target_role || 'Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [demandData, setDemandData] = useState([]);

  // Milestone Test Modal State
  const [activeQuizStep, setActiveQuizStep] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const [demandRes, profileRes] = await Promise.all([
          career.getSkillsDemand().catch(() => ({ data: [] })),
          studentId ? students.getProfile(studentId).catch(() => ({ data: {} })) : Promise.resolve({ data: {} })
        ]);
        setDemandData(demandRes.data || demandRes || []);
        
        const prof = profileRes.data || profileRes || {};
        if (prof.roadmap && prof.roadmap.length > 0 && !roadmap) {
          const loadedRoadmap = {
            steps: prof.roadmap,
            current_skills: prof.skills || ['HTML', 'CSS', 'JavaScript'],
            required_skills: ['React.js', 'FastAPI / Node.js', 'MongoDB', 'Docker', 'System Design'],
            certifications: [
              { name: 'Meta Front-End Developer Specialization', provider: 'Coursera' },
              { name: 'AWS Certified Cloud Practitioner', provider: 'Amazon Web Services' }
            ]
          };
          setRoadmap(loadedRoadmap);
          localStorage.setItem(storageKey, JSON.stringify(loadedRoadmap));
        }
      } catch (err) {
        console.error('Error fetching initial career data:', err);
      }
    };
    fetchInitial();
  }, [studentId]);

  const handleGenerate = async () => {
    if (!targetRole.trim()) {
      toast.error('Please enter a target role');
      return;
    }
    try {
      setLoading(true);
      const res = await career.getRoadmap(targetRole, user?.skills || ['Python', 'JavaScript'], studentId);
      const roadmapData = res.data || res;
      setRoadmap(roadmapData);
      localStorage.setItem(storageKey, JSON.stringify(roadmapData));
      
      // Update student profile in DB
      if (studentId) {
        await students.updateProfile(studentId, {
          target_role: targetRole,
          roadmap: roadmapData.steps || [],
          roadmap_progress: 25,
          journey_stage: 'Practice'
        }).catch(() => {});
      }
      
      toast.success('AI Roadmap generated & saved to your profile!');
    } catch (err) {
      console.error('Roadmap error:', err);
      toast.error('Could not generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenQuiz = (step) => {
    setActiveQuizStep(step);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuizStep || !activeQuizStep.quiz) return;
    
    let correct = 0;
    activeQuizStep.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) {
        correct++;
      }
    });

    const percentage = Math.round((correct / activeQuizStep.quiz.length) * 100);
    setQuizScore(percentage);

    if (percentage >= 70) {
      toast.success(`🎉 Passed with ${percentage}%! Milestone unlocked!`);
      
      // Mark step as completed in state and DB
      const updatedSteps = roadmap.steps.map(s => {
        if (s.id === activeQuizStep.id || s.title === activeQuizStep.title) {
          return { ...s, status: 'completed' };
        }
        return s;
      });

      // Unlock next step if available
      const currentIdx = updatedSteps.findIndex(s => s.id === activeQuizStep.id || s.title === activeQuizStep.title);
      if (currentIdx !== -1 && currentIdx + 1 < updatedSteps.length) {
        if (updatedSteps[currentIdx + 1].status === 'pending') {
          updatedSteps[currentIdx + 1].status = 'current';
        }
      }

      const completedCount = updatedSteps.filter(s => s.status === 'completed').length;
      const newProgress = Math.round((completedCount / updatedSteps.length) * 100);

      const newRoadmap = { ...roadmap, steps: updatedSteps };
      setRoadmap(newRoadmap);
      localStorage.setItem(storageKey, JSON.stringify(newRoadmap));

      if (studentId) {
        await students.updateProfile(studentId, {
          roadmap: updatedSteps,
          roadmap_progress: newProgress,
          verified_score: Math.min(100, (user?.verified_score || 0) + 15),
          journey_stage: newProgress >= 75 ? 'Get Hired' : 'Code'
        }).catch(() => {});
      }
    } else {
      toast.error(`Scored ${percentage}%. You need at least 70% to complete this milestone. Review the YouTube tutorials and try again!`);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiOutlineSparkles className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          AI Career Guidance & Interactive Roadmap
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm">Follow step-by-step milestones, watch curated video lectures, and pass milestone tests to prove your readiness.</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">Target Career Goal / Engineering Role</label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer, Data Scientist, Cloud Architect..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              list="role-suggestions"
            />
            <datalist id="role-suggestions">
              <option value="Full Stack Developer" />
              <option value="Data Scientist" />
              <option value="Machine Learning Engineer" />
              <option value="Cloud Solutions Architect" />
              <option value="DevOps & SRE Specialist" />
              <option value="Cybersecurity Analyst" />
            </datalist>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full md:w-auto h-11 px-6">
            {loading ? 'Building Roadmap...' : 'Generate / Update Roadmap'}
          </Button>
        </div>
      </Card>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner />
          <span className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">Gemini AI is analyzing industry requirements and curating tutorials...</span>
        </div>
      )}

      {!loading && roadmap && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Interactive Roadmap Steps */}
            <Card title="Milestone-by-Milestone Learning Path">
              <div className="space-y-6">
                {(roadmap.steps || []).map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl border transition-all ${
                        isCompleted 
                          ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20' 
                          : isCurrent 
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md' 
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 opacity-80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <h3 className="font-bold text-base text-gray-900 dark:text-white">{step.title}</h3>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' :
                          isCurrent ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 animate-pulse' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-500'
                        }`}>
                          {isCompleted ? 'Completed ✓' : isCurrent ? 'In Progress' : 'Locked'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed pl-8">{step.description}</p>
                      
                      {/* Curated Resources */}
                      {step.resources && step.resources.length > 0 && (
                        <div className="pl-8 mb-4">
                          <h4 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <HiOutlinePlayCircle className="w-4 h-4 text-rose-500" /> Curated Video Lectures & Guides:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.resources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500 text-xs font-medium text-indigo-600 dark:text-indigo-400 group transition-all"
                              >
                                <span className="line-clamp-1 group-hover:underline">{res.title}</span>
                                <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5 flex-shrink-0 ml-1 opacity-70" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Milestone Test Button */}
                      {step.quiz && step.quiz.length > 0 && (
                        <div className="pl-8 pt-2 flex justify-end">
                          <button
                            onClick={() => handleOpenQuiz(step)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isCompleted 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-95'
                            }`}
                          >
                            <HiOutlineAcademicCap className="w-4 h-4" />
                            {isCompleted ? 'Retake Milestone Quiz' : 'Take Milestone Exam (70%+ to Pass) →'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Skill Gap Analysis */}
            <Card title="Skill Gap & Preparation Analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Your Current Strengths</h3>
                  <ul className="space-y-2">
                    {(user?.skills && user.skills.length > 0 ? user.skills : (roadmap.current_skills || ['HTML', 'CSS', 'JavaScript'])).map((s, i) => (
                      <li key={i} className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/60">
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3 text-sm">Required Key Competencies</h3>
                  <ul className="space-y-2">
                    {(roadmap.required_skills || ['React', 'FastAPI / Node.js', 'MongoDB', 'Docker', 'System Design']).map((s, i) => (
                      <li key={i} className="flex items-center text-xs font-medium text-indigo-700 dark:text-indigo-300">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Industry Demand & Certs */}
          <div className="space-y-8">
            <Card title="Industry Demand (Live Trends)">
              <div className="h-64">
                {demandData.length > 0 ? (
                  <BarChart data={demandData} xKey="skill" yKey="demand" />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400 text-sm">Live Demand Loading...</div>
                )}
              </div>
            </Card>

            <Card title="Accredited Industry Certifications">
              <ul className="space-y-3">
                {(roadmap.certifications || [
                  { name: 'AWS Certified Solutions Architect Associate', provider: 'Amazon Web Services' },
                  { name: 'Meta Front-End Developer Specialization', provider: 'Coursera' }
                ]).map((cert, i) => (
                  <li key={i} className="p-3.5 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/40 hover:shadow-sm transition-all">
                    <h4 className="font-semibold text-xs text-gray-900 dark:text-white">{cert.name}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Issued by {cert.provider}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* Milestone Exam Modal */}
      {activeQuizStep && (
        <Modal 
          isOpen={!!activeQuizStep} 
          onClose={() => setActiveQuizStep(null)} 
          title={`Milestone Exam: ${activeQuizStep.title}`}
        >
          <div className="space-y-5">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Answer all questions correctly. Score at least <strong>70%</strong> to mark this milestone as complete and unlock the next stage.
            </p>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {(activeQuizStep.quiz || []).map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-2.5">
                    {idx + 1}. {q.question}
                  </h4>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => (
                      <label 
                        key={oIdx}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          quizAnswers[idx] === opt
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-900 dark:text-indigo-200'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz-q-${idx}`}
                          value={opt}
                          checked={quizAnswers[idx] === opt}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: opt })}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {quizScore !== null && (
              <div className={`p-3.5 rounded-xl text-center text-xs font-bold ${
                quizScore >= 70 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                Score: {quizScore}% {quizScore >= 70 ? '— Passed! Milestone Complete.' : '— Needs 70% to Pass. Review material and retry.'}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <Button type="button" variant="secondary" onClick={() => setActiveQuizStep(null)}>Close</Button>
              <Button onClick={handleSubmitQuiz}>Submit Milestone Exam</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CareerGuidance;
