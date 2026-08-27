import React, { useState } from 'react';
import { Card, Button, Badge, SkillTag } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function FacultyOpportunities() {
  const [filter, setFilter] = useState('All');

  const opportunities = [
    { id: 1, type: 'FDP', title: 'Advanced Generative AI', org: 'Google Cloud', duration: '5 Days', tags: ['AI', 'Cloud'], desc: 'Learn to integrate GenAI tools into your curriculum. Hands-on labs included.', status: 'open' },
    { id: 2, type: 'Industrial Training', title: 'AWS Solutions Architect Training', org: 'Amazon', duration: '2 Weeks', tags: ['AWS', 'Architecture'], desc: 'Immersive on-site training for faculty teaching cloud computing.', status: 'open' },
    { id: 3, type: 'Consultancy', title: 'Data Pipeline Optimization', org: 'FinTech Startup', duration: '3 Months', tags: ['Python', 'Data Engineering'], desc: 'Consulting role to help optimize their data ingestion pipeline.', status: 'applied' },
    { id: 4, type: 'Research', title: 'Edge Computing in Smart Cities', org: 'Cisco', duration: '6 Months', tags: ['IoT', 'Networking'], desc: 'Joint research initiative for developing low-latency edge nodes.', status: 'open' }
  ];

  const handleApply = (id) => {
    toast.success('Application submitted successfully!');
  };

  const getBadgeVariant = (type) => {
    switch(type) {
      case 'FDP': return 'purple';
      case 'Industrial Training': return 'blue';
      case 'Consultancy': return 'green';
      case 'Research': return 'indigo';
      default: return 'secondary';
    }
  };

  const filteredOpps = filter === 'All' ? opportunities : opportunities.filter(o => o.type === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Faculty Development & Opportunities</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'FDP', 'Industrial Training', 'Consultancy', 'Research'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map(opp => (
          <Card key={opp.id} className="p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <Badge variant={getBadgeVariant(opp.type)}>{opp.type}</Badge>
              {opp.status === 'applied' && <Badge variant="success">Applied</Badge>}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{opp.title}</h3>
            <p className="text-sm font-medium text-gray-600 mb-3">{opp.org} • {opp.duration}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {opp.tags.map(tag => <SkillTag key={tag} skill={tag} />)}
            </div>
            
            <p className="text-gray-600 text-sm mb-6 flex-1">{opp.desc}</p>
            
            <Button 
              variant={opp.status === 'applied' ? 'secondary' : 'primary'} 
              className="w-full"
              disabled={opp.status === 'applied'}
              onClick={() => handleApply(opp.id)}
            >
              {opp.status === 'applied' ? 'Application Under Review' : 'Apply Now'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
