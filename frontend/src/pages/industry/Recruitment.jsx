import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/common';
import { toast } from 'react-hot-toast';

export default function Recruitment() {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobs = [
    { id: 1, title: 'Frontend Developer', type: 'Job', posted: '2 days ago', applicants: 45, shortlisted: 12 },
    { id: 2, title: 'Data Science Intern', type: 'Internship', posted: '1 week ago', applicants: 120, shortlisted: 25 }
  ];

  const applicants = [
    { id: 101, name: 'Rahul Sharma', score: 95, status: 'Shortlisted', date: 'Oct 15' },
    { id: 102, name: 'Amit Kumar', score: 88, status: 'Under Review', date: 'Oct 16' },
    { id: 103, name: 'Priya Patel', score: 92, status: 'Applied', date: 'Oct 17' }
  ];

  const handleStatusChange = (e) => {
    toast.success(`Status updated to ${e.target.value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Recruitment Management</h1>
        <Button variant="primary">Export Data</Button>
      </div>

      <div className="space-y-4">
        {jobs.map(job => (
          <Card key={job.id} className="overflow-hidden border border-gray-200">
            <div 
              className="p-6 bg-white cursor-pointer hover:bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <Badge variant={job.type === 'Job' ? 'blue' : 'purple'}>{job.type}</Badge>
                </div>
                <p className="text-sm text-gray-500">Posted {job.posted}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Applicants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-indigo-600">{job.shortlisted}</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Shortlisted</p>
                </div>
              </div>
            </div>

            {expandedJob === job.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Application Pipeline</h4>
                  <div className="space-x-2">
                    <Button variant="secondary" className="text-sm py-1">Filter by Status</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Applicant Name</th>
                        <th className="px-4 py-3">AI Score</th>
                        <th className="px-4 py-3">Applied On</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {applicants.map(app => (
                        <tr key={app.id}>
                          <td className="px-4 py-3 font-medium text-gray-900">{app.name}</td>
                          <td className="px-4 py-3"><span className="font-bold text-green-600">{app.score}</span></td>
                          <td className="px-4 py-3 text-gray-600">{app.date}</td>
                          <td className="px-4 py-3">
                            <select 
                              className="border border-gray-300 rounded text-sm p-1 focus:ring-indigo-500"
                              defaultValue={app.status}
                              onChange={handleStatusChange}
                            >
                              <option>Applied</option>
                              <option>Under Review</option>
                              <option>Shortlisted</option>
                              <option>Interviewed</option>
                              <option>Offered</option>
                              <option>Rejected</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <a href="#" className="text-indigo-600 hover:underline">View Profile</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
