import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import getProblems from "./problems";
import URL from "../url";

const ProblemDetail = () => {
  const { QId } = useParams();
  const [fullQuestion, setFullQuestion] = useState(null);
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null); // State for response message
  const navigate = useNavigate(); // Use navigate to redirect users

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const problems = await getProblems();
        const problemId = parseInt(QId, 10);
        const foundProblem = problems.find((problem) => problem.QId === problemId);

        if (foundProblem) {
          setFullQuestion(foundProblem);
        } else {
          setError("Problem not found");
        }
      } catch (err) {
        setError("Error fetching the problem");
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [QId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        navigate('/signin');
        return;
      }
      const response = await fetch(`${URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ QId, code }),
      });

      console.log('Response:', response);
      if(response.ok){
        navigate('/me');
      }
      else{
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log response

      // Store response message
      setResponseMessage(data.message); // Assuming the response has a `message` field

    } catch (error) {
      console.log(error);
      setResponseMessage("An error occurred while submitting the code."); // Set error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">{error}</h2>
          <Link to="/problems" className="text-blue-600 hover:underline">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex">
      <div className="w-1/3 bg-white rounded-lg shadow-md p-8 mr-4">
        <h1 className="text-3xl text-blue-600 mb-4">
          {fullQuestion.QId}. {fullQuestion.title}
        </h1>
        <p className="text-gray-700 mb-6">{fullQuestion.description}</p>
        <span
          className={`inline-block px-3 py-1 text-sm rounded-full ${
            fullQuestion.level === "Easy"
              ? "bg-green-100 text-green-800"
              : fullQuestion.level === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {fullQuestion.level}
        </span>
        <div className="mt-6">
          <h2 className="text-2xl text-gray-800 mb-2">Test Cases</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700 font-semibold">
                  Input
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700 font-semibold">
                  Output
                </th>
              </tr>
            </thead>
            <tbody>
              {fullQuestion.testCases.map((testCase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-300 text-gray-600">
                    {testCase.input}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-gray-600">
                    {testCase.output}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          to="/problems"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Back to Problems
        </Link>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-md p-8">
        <label htmlFor="language" className="block text-lg mb-2">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full mb-4 border border-gray-300 rounded-md p-2"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="Ruby">Ruby</option>
        </select>
        <textarea
          rows="17"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="block w-full border border-gray-300 rounded-md p-2"
          required
        />
        
        {/* Display response message */}
        {responseMessage && (
          <div className="mt-4 p-2 border rounded bg-gray-100 text-gray-700">
            {responseMessage}
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-5"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300 mt-5"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
