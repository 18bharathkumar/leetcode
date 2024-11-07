import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getProblems from './problems';
const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const fetchedProblems = await getProblems(); // Fetch problems using the function
        setProblems(fetchedProblems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchProblems(); // Call the function to load data on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Coding Problems</h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {problems.map((problem) => (
          <Link
            to={`/problems/${problem.QId}`}
            key={problem.QId}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
              {/* Problem ID and Title */}
              <div className="flex flex-col md:flex-row md:items-center">
                <h2 className="text-xl font-semibold text-blue-600 md:mr-4">
                  {problem.QId}. {problem.title}
                </h2>
                {/* Problem Level */}
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 md:mt-0 md:mr-4 ${
                    problem.level === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : problem.level === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {problem.level}
                </span>
              </div>

              {/* Acceptance Rate */}
              <p className="text-gray-600 mt-2 md:mt-0">
                Acceptance Rate: {problem.acceptanceRate}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
