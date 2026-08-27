import React from 'react';
import SkillRadar from '../charts/SkillRadar';
import Badge from '../common/Badge';
import Card from '../common/Card';

const SkillProfile = ({ skills = [], data = [], gaps = [], strengths = [] }) => {
  const allSkills = skills.length > 0 ? skills : data;

  const topStrengths = strengths.length > 0 
    ? strengths 
    : allSkills.filter(s => (s.score || s.value || s.level || 0) >= 70).map(s => s.name || s.skill || s);

  const topGaps = gaps.length > 0 
    ? gaps 
    : allSkills.filter(s => (s.score || s.value || s.level || 0) < 70).map(s => s.name || s.skill || s);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkillRadar data={allSkills} title="Skill Assessment Radar" />
      
      <Card title="Skill Analysis">
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Verified Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {topStrengths.map((skill, i) => (
                <Badge key={i} text={typeof skill === 'object' ? (skill.name || skill.skill) : skill} variant="green" />
              ))}
              {topStrengths.length === 0 && <p className="text-gray-400 text-sm">Take assessments to verify skills.</p>}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Skill Gaps to Address</h4>
            <div className="flex flex-wrap gap-2">
              {topGaps.map((skill, i) => (
                <Badge key={i} text={typeof skill === 'object' ? (skill.name || skill.skill) : skill} variant="red" />
              ))}
              {topGaps.length === 0 && <p className="text-gray-400 text-sm">No critical gaps identified.</p>}
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-sm mb-1">AI Recommendation</h4>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed">
              Focus on strengthening core fundamentals to maximize role match percentages. Complete practical coding challenges and review system design.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkillProfile;
