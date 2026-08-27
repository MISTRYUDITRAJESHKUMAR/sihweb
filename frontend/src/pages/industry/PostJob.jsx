import React, { useState } from 'react';
import { Card, Button, SkillTag } from '../../components/common';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Job',
    location: '',
    salary: '',
    duration: '',
    description: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Opportunity posted successfully!');
    navigate('/industry');
  };

  const skillArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Post New Opportunity</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title *</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Frontend Developer" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500">
                  <option>Job</option><option>Internship</option><option>Apprenticeship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" placeholder="Remote / City" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary / Stipend</label>
                <input type="text" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" placeholder="e.g. 10 LPA" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (if internship)</label>
                <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" placeholder="e.g. 6 Months" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma separated)</label>
              <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" placeholder="React, Node.js, TypeScript" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea required rows="5" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" placeholder="Describe the role..."></textarea>
            </div>

            <Button type="submit" variant="primary" className="w-full">Publish Opportunity</Button>
          </form>
        </Card>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
          <Card className="p-6 bg-gray-50 border-dashed border-2 border-gray-300">
            {formData.title ? (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{formData.title}</h2>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">{formData.type}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  {formData.location && <p>📍 {formData.location}</p>}
                  {formData.salary && <p>💰 {formData.salary}</p>}
                  {formData.duration && formData.type !== 'Job' && <p>⏱️ {formData.duration}</p>}
                </div>
                {skillArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skillArray.map(s => <SkillTag key={s} skill={s} />)}
                  </div>
                )}
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {formData.description || 'Description will appear here...'}
                </div>
                <div className="mt-6">
                  <Button variant="primary" className="w-full opacity-50 cursor-not-allowed">Apply Now</Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10">
                Start typing to see preview
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
