// SubmissionCard.js
import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const SubmissionCard = ({ submission }) => {
  const navigate = useNavigate();

  const handleShowCode = () => {
    navigate('/code-detail', { state: submission }); // Pass the submission details to the CodeDetail page
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">Question ID: {submission.QId}</p>
        {submission.status === 'accepted' ? (
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-600" />
        )}
      </div>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Status: </span>
        <span className={submission.status === 'accepted' ? 'text-green-600' : 'text-red-600'}>
          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Submission Time: </span>
        {dayjs(submission.time).format('MMM DD, YYYY h:mm A')}
      </p>

      {/* Show Code Button */}
      <button
        onClick={handleShowCode}
        className="mt-2 text-blue-600 hover:underline"
      >
        Show Code
      </button>
    </div>
  );
};

export default SubmissionCard;
