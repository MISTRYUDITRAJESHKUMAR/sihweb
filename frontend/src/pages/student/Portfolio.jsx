import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portfolio, students } from '../../api/client';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SkillTag from '../../components/common/SkillTag';
import SkillRadar from '../../components/charts/SkillRadar';
import CertificateCard from '../../components/features/CertificateCard';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HiOutlinePlus, HiOutlineShare, HiOutlineFolderPlus, HiOutlineAcademicCap, HiOutlineTrophy } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ skills: [], certificates: [], projects: [], achievements: [] });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);

  const [newProject, setNewProject] = useState({ title: '', description: '', tech_stack: '', link: '' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '' });
  const [newAch, setNewAch] = useState({ title: '' });

  const studentId = user?.student_id || user?.id;

  const fetchData = async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [portRes, profRes] = await Promise.all([
        portfolio.get(studentId).catch(() => ({ data: {} })),
        students.getProfile(studentId).catch(() => ({ data: {} }))
      ]);
      
      const portData = portRes.data || portRes || {};
      const profData = profRes.data || profRes || {};
      
      setData({
        skills: portData.skills || [
          { name: 'React', level: 85 },
          { name: 'Python', level: 80 },
          { name: 'FastAPI', level: 75 },
          { name: 'MongoDB', level: 70 }
        ],
        certificates: portData.certificates || [],
        projects: portData.projects || [],
        achievements: portData.achievements || []
      });
      setProfile(profData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const techArray = newProject.tech_stack.split(',').map(s => s.trim()).filter(Boolean);
      await portfolio.addProject(studentId, { ...newProject, tech_stack: techArray });
      toast.success('Project added to your portfolio & database!');
      setIsProjectModalOpen(false);
      setNewProject({ title: '', description: '', tech_stack: '', link: '' });
      fetchData();
    } catch (err) {
      toast.error('Could not save project');
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    try {
      await portfolio.addCertificate(studentId, newCert);
      toast.success('Certificate added to your portfolio!');
      setIsCertModalOpen(false);
      setNewCert({ title: '', issuer: '', date: '' });
      fetchData();
    } catch (err) {
      toast.error('Could not save certificate');
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    try {
      await portfolio.addAchievement(studentId, newAch);
      toast.success('Achievement saved to database!');
      setIsAchModalOpen(false);
      setNewAch({ title: '' });
      fetchData();
    } catch (err) {
      toast.error('Could not save achievement');
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Digital Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">Showcase your verified skills, projects, and achievements stored in your profile.</p>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            toast.success('Portfolio link copied to clipboard!');
          }}
          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-100 transition-all"
        >
          <HiOutlineShare className="w-4 h-4" /> Share Portfolio
        </button>
      </div>

      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white p-7 rounded-3xl shadow-lg border border-indigo-800 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white border border-white/30">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-indigo-200 text-sm mt-0.5">{profile?.target_role || 'Full Stack Developer'}</p>
          <p className="text-indigo-300 text-xs mt-0.5">{user?.email}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 text-center">
          <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-0.5">Verified Score</div>
          <div className="text-3xl font-black text-emerald-400">{profile?.verified_score || 0}<span className="text-sm text-indigo-200">/100</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card title="Verified Skills">
            <div className="mb-4 h-60">
              <SkillRadar data={data?.skills || []} />
            </div>
            <div className="flex flex-wrap gap-2">
              {(data?.skills || []).map((skill, idx) => (
                <SkillTag key={idx} skill={skill.name} level={skill.level} />
              ))}
            </div>
          </Card>

          <Card title="Achievements & Honors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500 font-semibold">Recognitions</span>
              <button 
                onClick={() => setIsAchModalOpen(true)}
                className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <HiOutlinePlus className="w-4 h-4" /> Add
              </button>
            </div>
            <ul className="space-y-2.5">
              {(data?.achievements || []).map((ach, idx) => (
                <li key={idx} className="flex items-start text-xs font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-amber-500 mr-2">🏆</span> {ach}
                </li>
              ))}
              {(!data?.achievements || data.achievements.length === 0) && (
                <p className="text-xs text-gray-400 text-center py-4">No achievements added yet. Click + Add to record milestones.</p>
              )}
            </ul>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Projects */}
          <Card title="Projects & Case Studies">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500 font-semibold">Built Solutions</span>
              <button 
                onClick={() => setIsProjectModalOpen(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1"
              >
                <HiOutlinePlus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data?.projects || []).map((proj, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4.5 hover:shadow-md transition-all bg-white dark:bg-gray-850 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-base text-gray-900 dark:text-white">{proj.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 mb-3 line-clamp-3 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(proj.tech_stack || []).map((tech, i) => (
                        <span key={i} className="text-[11px] font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                      View Live Project →
                    </a>
                  )}
                </div>
              ))}
              {(!data?.projects || data.projects.length === 0) && (
                <div className="col-span-full text-center py-10 text-gray-400 text-xs border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                  No projects added yet. Click "Add Project" to add your work to the database!
                </div>
              )}
            </div>
          </Card>

          {/* Certifications */}
          <Card title="Certifications">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500 font-semibold">Verified Credentials</span>
              <button 
                onClick={() => setIsCertModalOpen(true)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1"
              >
                <HiOutlinePlus className="w-3.5 h-3.5" /> Add Certificate
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(data?.certificates || []).map((cert, idx) => (
                <CertificateCard key={idx} certificate={cert} />
              ))}
              {(!data?.certificates || data.certificates.length === 0) && (
                <div className="col-span-full text-center py-10 text-gray-400 text-xs border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                  No certifications added yet.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Add Project to Portfolio">
        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Project Title</label>
            <input required type="text" placeholder="e.g. SyncSpace Platform" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Description</label>
            <textarea required placeholder="Describe what problem you solved and key features..." className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500" rows="3" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Tech Stack (comma separated)</label>
            <input required type="text" placeholder="React, FastAPI, MongoDB, Tailwind CSS" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProject.tech_stack} onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Project URL / GitHub Repo</label>
            <input type="text" placeholder="github.com/username/project" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsProjectModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Project to Database</Button>
          </div>
        </form>
      </Modal>

      {/* Add Certificate Modal */}
      <Modal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} title="Add Certificate">
        <form onSubmit={handleAddCert} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Certificate Title</label>
            <input required type="text" placeholder="e.g. AWS Solutions Architect" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Issuer / Organization</label>
            <input required type="text" placeholder="e.g. Amazon Web Services / Coursera" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Date</label>
            <input type="text" placeholder="e.g. August 2026" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none" value={newCert.date} onChange={e => setNewCert({...newCert, date: e.target.value})} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsCertModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Certificate</Button>
          </div>
        </form>
      </Modal>

      {/* Add Achievement Modal */}
      <Modal isOpen={isAchModalOpen} onClose={() => setIsAchModalOpen(false)} title="Add Achievement">
        <form onSubmit={handleAddAchievement} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Achievement Detail</label>
            <input required type="text" placeholder="e.g. Winner of Smart India Hackathon 2026" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-2.5 text-sm outline-none" value={newAch.title} onChange={e => setNewAch({...newAch, title: e.target.value})} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAchModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Achievement</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Portfolio;
