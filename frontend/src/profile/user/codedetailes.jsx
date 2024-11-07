import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CodeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate between pages
  const { QId, status, code } = location.state; // Get the data passed from the previous page

  const handleBackToProfile = () => {
    navigate('/profile'); // Navigate back to the profile page (assuming '/' is the profile route)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Submission Details</h1>
        <p className="text-lg mb-2">
          <span className="font-semibold">Question ID:</span> {QId}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Status:</span>
          <span className={status === 'accepted' ? 'text-green-600' : 'text-red-600'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </p>
        <pre className="bg-gray-200 p-4 rounded text-sm overflow-auto font-mono">
          <code>{code}</code>
        </pre>

        {/* Back to Profile button */}
        <button
          onClick={handleBackToProfile}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default CodeDetail;
