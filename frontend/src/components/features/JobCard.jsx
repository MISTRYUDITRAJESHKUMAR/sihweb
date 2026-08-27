import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { HiOutlineMapPin, HiOutlineCurrencyRupee } from 'react-icons/hi2';

const JobCard = ({ job, onApply }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{job.role}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <Badge text={job.type} variant="indigo" />
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <HiOutlineMapPin className="w-4 h-4 mr-1" /> {job.location}
        </div>
        <div className="flex items-center">
          <HiOutlineCurrencyRupee className="w-4 h-4 mr-1" /> {job.stipend || 'Competitive'}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {job.req_skills?.map((skill, i) => (
            <Badge key={i} text={skill} variant="gray" size="sm" />
          ))}
        </div>
      </div>

      {job.match_percentage !== undefined && (
        <div className="mb-4">
          <ProgressBar 
            value={job.match_percentage} 
            color={job.match_percentage > 75 ? 'green' : job.match_percentage > 50 ? 'orange' : 'indigo'} 
            label="Skill Match"
            height="sm"
          />
        </div>
      )}

      <Button fullWidth variant={job.applied ? 'secondary' : 'primary'} onClick={() => onApply(job)} disabled={job.applied}>
        {job.applied ? 'Applied' : 'Apply Now'}
      </Button>
    </Card>
  );
};

export default JobCard;
