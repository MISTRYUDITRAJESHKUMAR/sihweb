import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function Programs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const programs = [
    { id: 1, type: 'Training', title: 'React for Enterprise', duration: '4 Weeks', impact: '120 Students Trained', status: 'Active' },
    { id: 2, type: 'Workshop', title: 'Cloud Cost Optimization', duration: '2 Days', impact: '45 Faculty Trained', status: 'Completed' },
    { id: 3, type: 'Mentorship', title: 'Women in Tech Mentorship', duration: '6 Months', impact: '25 Mentees', status: 'Active' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Program created successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Training Programs & Initiatives</h1>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">Create New Program</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map(prog => (
          <Card key={prog.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge variant={prog.type === 'Training' ? 'blue' : prog.type === 'Workshop' ? 'purple' : 'green'}>{prog.type}</Badge>
              <Badge variant={prog.status === 'Active' ? 'success' : 'secondary'}>{prog.status}</Badge>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{prog.title}</h3>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>Duration: {prog.duration}</p>
              <p>Impact: <span className="font-medium text-gray-900">{prog.impact}</span></p>
            </div>
            <Button variant="secondary" className="w-full text-sm">Manage Program</Button>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Program">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Program Title</label><input type="text" required className="w-full border rounded-lg p-2"/></div>
          <div><label className="block text-sm font-medium mb-1">Type</label>
            <select className="w-full border rounded-lg p-2"><option>Training Program</option><option>Workshop</option><option>Mentorship</option></select>
          </div>
          <div><label className="block text-sm font-medium mb-1">Target Audience</label>
            <select className="w-full border rounded-lg p-2"><option>Students</option><option>Faculty</option><option>Both</option></select>
          </div>
          <div><label className="block text-sm font-medium mb-1">Duration</label><input type="text" className="w-full border rounded-lg p-2"/></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
