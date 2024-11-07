import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-white text-gray-800  px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/admin/add-question"
            className="hover:text-blue-400"
          >
            Add Questions
          </Link>
          <Link
            to="/admin/manage-users"
            className="hover:text-blue-400"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/view-submissions"
            className="hover:text-blue-400"
          >
            View Submissions
          </Link>
          <Link
            to="/admin/delete-questions"
            className="hover:text-blue-400"
          >
            Delete Questions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
