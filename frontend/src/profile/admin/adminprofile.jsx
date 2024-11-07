import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminnav';
export default function AdminProfile({ data }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <AdminNavbar />

      {/* Admin Dashboard Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6">Welcome, {data.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Questions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Question</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={()=>{
                navigate('/addQuestions')
              }}
            >
              AddQuestions
            </button>
            
            
          </div>

          {/* Manage Users Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <p>Here you can manage all registered users.</p>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Manage Users
            </button>
          </div>

          {/* View Submissions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">View Submissions</h2>
            <p>Check the status of submissions and view details.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
              View Submissions
            </button>
          </div>

          {/* Delete Questions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Delete Questions</h2>
            <p>Remove outdated or incorrect questions from the system.</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
