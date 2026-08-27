import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function Collaborations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'Workshop', partner: '', description: '' });

  const activeCollabs = [
    { id: 1, type: 'Mentorship', title: 'AI/ML Industry Mentorship', partner: 'TechCorp Solutions', status: 'Active' },
    { id: 2, type: 'Research', title: 'IoT Smart City Sensors', partner: 'InnovaSys', status: 'In Progress' },
    { id: 3, type: 'Guest Lecture', title: 'Cloud Computing Trends', partner: 'AWS Activate', status: 'Upcoming' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Collaboration proposal submitted successfully!');
    setIsModalOpen(false);
    setFormData({ title: '', type: 'Workshop', partner: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Industry-Academia Collaborations</h1>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">Propose Collaboration</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeCollabs.map(collab => (
          <Card key={collab.id} className="p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <Badge variant={collab.type === 'Research' ? 'primary' : collab.type === 'Mentorship' ? 'success' : 'warning'}>
                {collab.type}
              </Badge>
              <Badge variant="secondary">{collab.status}</Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{collab.title}</h3>
            <p className="text-sm text-gray-600 mt-auto pt-4 border-t border-gray-100">Partner: <span className="font-medium text-gray-900">{collab.partner}</span></p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events & Workshops</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-center min-w-[80px]">
              <div className="text-xs text-red-500 font-bold uppercase">Oct</div>
              <div className="text-xl font-bold text-gray-900">15</div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">System Design Masterclass</h4>
              <p className="text-sm text-gray-600 mt-1">Hosted by Google Engineers. Covering distributed systems basics.</p>
            </div>
          </div>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Propose New Collaboration">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500">
              <option>Workshop</option><option>Mentorship</option><option>Research</option><option>Guest Lecture</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Industry Partner (Optional)</label>
            <input type="text" value={formData.partner} onChange={e => setFormData({...formData, partner: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Submit Proposal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
