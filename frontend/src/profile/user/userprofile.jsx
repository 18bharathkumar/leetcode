// UserProfile.js
import React, { useEffect, useState } from 'react';
import fetchprofile from '../../fetch/fetchuserdata';
import SubmissionCard from './submissioncard';

const UserProfile = ({data}) => {
  

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userdata = await fetchprofile(); // Await the fetch
        if (userdata) {
          setData(userdata); // Update with fetched data
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error); // Log errors if fetch fails
      }
    };

    loadUserProfile(); // Call the function inside useEffect
  }, []);

  return (
    data && (
      <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-blue-700">User Profile</h1>
          <div className="mt-4">
            <p className="text-lg">
              <span className="font-bold text-gray-700">Name: </span>
              {data.name}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-700">Email: </span>
              {data.email}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-700">Role: </span>
              {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
            </p>
          </div>
        </div>

        {/* Submissions Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-5xl">
          <h2 className="text-2xl font-semibold text-blue-700">Submissions</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.submissions.length > 0 ? (
              data.submissions.map((submission) => (
                <SubmissionCard key={submission._id} submission={submission} />
              ))
            ) : (
              <p className="text-gray-600">No submissions available.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
