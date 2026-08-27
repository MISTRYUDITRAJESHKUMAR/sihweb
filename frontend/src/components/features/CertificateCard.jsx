import React from 'react';
import Card from '../common/Card';
import { HiOutlineCheckBadge, HiOutlineAcademicCap, HiOutlineTrophy, HiOutlineDocumentCheck } from 'react-icons/hi2';

const CertificateCard = ({ certificate, title, issuer, provider, date, type = 'certificate', verified = false }) => {
  const item = certificate || {};
  const displayTitle = item.title || title || 'Certificate';
  const displayIssuer = item.issuer || item.provider || issuer || provider || 'Verified Provider';
  const displayDate = item.date || date || 'Recently Earned';
  const displayType = item.type || type || 'certificate';
  const isVerified = item.verified !== undefined ? item.verified : (verified !== undefined ? verified : true);

  const getIcon = () => {
    switch(displayType?.toLowerCase()) {
      case 'project': return <HiOutlineDocumentCheck className="w-7 h-7 text-blue-500" />;
      case 'achievement': return <HiOutlineTrophy className="w-7 h-7 text-amber-500" />;
      default: return <HiOutlineAcademicCap className="w-7 h-7 text-indigo-500" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl flex-shrink-0">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{displayTitle}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{displayIssuer}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{displayDate}</p>
          </div>
        </div>
        {isVerified && (
          <div className="flex flex-col items-center flex-shrink-0" title="Verified by SyncSpace Platform">
            <HiOutlineCheckBadge className="w-5 h-5 text-emerald-500" />
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase mt-0.5">Verified</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CertificateCard;
