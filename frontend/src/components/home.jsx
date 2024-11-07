// src/pages/Home.jsx

import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Meetcode!</h1>
      
      <div className="mt-8 max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">The Importance of Data Structures and Algorithms</h2>
        <p className="mt-4 text-gray-600">
          Understanding Data Structures and Algorithms (DSA) is crucial for any programmer. Here are some reasons why:
        </p>
        <ul className="mt-4 text-left space-y-2">
          <li className="flex items-start">
            <span className="mr-2 text-blue-600">•</span>
            <span>Problem-Solving Skills: DSA helps break down complex problems into manageable parts.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600">•</span>
            <span>Efficiency: Choosing the right data structure can optimize performance and reduce resource usage.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600">•</span>
            <span>Interview Preparation: DSA knowledge is crucial for technical interviews at major tech companies.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600">•</span>
            <span>Code Readability and Maintainability: Well-structured code is easier to read and maintain.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
