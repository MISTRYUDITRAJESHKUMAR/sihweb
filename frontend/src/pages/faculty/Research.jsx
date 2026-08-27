import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function FacultyResearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Research proposal submitted!');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Collaborative Research & Innovation</h1>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">Propose Research Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Research Projects</h3>
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between">
                <Badge variant="primary">AI/ML</Badge>
                <span className="text-xs font-medium text-gray-500">Ongoing</span>
              </div>
              <h4 className="font-semibold text-gray-900 mt-2">Resource Optimization using LLMs</h4>
              <p className="text-sm text-gray-600 mt-1">Partner: TechCorp Research Lab</p>
              <div className="mt-3 text-sm text-gray-500">Team: Dr. Sharma, 2 PhD Students</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Innovation Challenges (Industry)</h3>
          <div className="space-y-4">
            <div className="border border-indigo-100 bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900">Sustainable Supply Chain Routing</h4>
              <p className="text-sm text-indigo-700 mt-1">Posted by: GlobalLogistics Inc.</p>
              <p className="text-sm text-gray-600 mt-2">Looking for academic partners to develop novel algorithms for minimizing carbon footprint in last-mile delivery.</p>
              <Button variant="secondary" className="mt-3 text-sm py-1">Express Interest</Button>
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Propose Research Project">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Project Title</label><input type="text" required className="w-full border rounded-lg p-2"/></div>
          <div><label className="block text-sm font-medium mb-1">Domain</label><input type="text" required className="w-full border rounded-lg p-2"/></div>
          <div><label className="block text-sm font-medium mb-1">Abstract/Summary</label><textarea rows="4" required className="w-full border rounded-lg p-2"></textarea></div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
