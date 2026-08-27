import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { Card, Button, Badge, SkillTag } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Mock candidates sorted by AI score
  const candidates = [
    { id: 1, name: 'Rahul Sharma', college: 'National Institute of Technology', role: 'Full Stack Developer', score: 95, match: 98, stage: 'Job Ready', skills: ['React', 'Node.js', 'AWS', 'MongoDB'], certs: ['AWS Solutions Architect', 'Meta Frontend Developer'], projects: 4 },
    { id: 2, name: 'Priya Patel', college: 'State Engineering College', role: 'Data Scientist', score: 92, match: 85, stage: 'Job Ready', skills: ['Python', 'TensorFlow', 'SQL'], certs: ['IBM Data Science'], projects: 3 },
    { id: 3, name: 'Karan Singh', college: 'Institute of Technology', role: 'Backend Developer', score: 88, match: 82, stage: 'Project Building', skills: ['Java', 'Spring Boot', 'MySQL'], certs: [], projects: 2 },
  ];

  const handleShortlist = (id) => {
    toast.success('Candidate shortlisted! They will be notified.');
  };

  const getRankBadge = (index) => {
    if (index === 0) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (index === 1) return 'bg-gray-200 text-gray-800 border-gray-400';
    if (index === 2) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Find Verified Talent</h1>
          <Badge variant="success">AI Verified Only</Badge>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by skills, role, or name..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Button variant="secondary" className="flex items-center gap-2">
          <HiOutlineAdjustmentsHorizontal /> Filters
        </Button>
      </Card>

      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <Card key={candidate.id} className="p-6 transition-all hover:border-indigo-200">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg ${getRankBadge(index)}`}>
                #{index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600 font-medium">{candidate.role} • {candidate.college}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-500">{candidate.score}</div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">Verified Score</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {candidate.skills.map(skill => <SkillTag key={skill} skill={skill} />)}
                </div>

                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                  <Badge variant={candidate.stage === 'Job Ready' ? 'success' : 'primary'}>{candidate.stage}</Badge>
                  <span className="text-sm text-gray-600 font-medium">{candidate.match}% Role Match</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button variant="primary" onClick={() => handleShortlist(candidate.id)}>Shortlist</Button>
                <Button variant="secondary" onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}>
                  {expandedId === candidate.id ? 'Hide Details' : 'View Profile'}
                </Button>
              </div>
            </div>

            {expandedId === candidate.id && (
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Verified Certifications</h4>
                  {candidate.certs.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {candidate.certs.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  ) : <p className="text-sm text-gray-500">No external certifications</p>}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI Assessment Feedback</h4>
                  <p className="text-sm text-gray-700 italic">"Strong problem-solving skills demonstrated in practical assessments. Code quality is production-ready. Communication skills are excellent."</p>
                  <p className="text-sm text-gray-500 mt-2">Projects completed: <span className="font-semibold text-gray-900">{candidate.projects}</span></p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
