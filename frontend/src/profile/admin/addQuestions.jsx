import React, { useState } from 'react';
import URL from '../../url';
import { Routes,Route, useNavigate } from 'react-router-dom';
const AddQuestionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    QId: '',
    title: '',
    description: '',
    level: 'Easy', // Set a default level if needed
    acceptanceRate: '',
    testCases: [{ input: '', output: '' }], // Initialize with one test case
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qidError, setQidError] = useState(null); // Specific error for QId

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset QId error when user changes the input
    if (name === 'QId') {
      setQidError(null);
    }
  };

  // Handle change in test case input/output
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = formData.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setFormData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases,
    }));
  };

  // Add a new test case
  const addTestCase = () => {
    setFormData((prevData) => ({
      ...prevData,
      testCases: [...prevData.testCases, { input: '', output: '' }],
    }));
  };

  // Remove a test case
  const removeTestCase = (index) => {
    const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQidError(null); // Reset QId error

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const response = await fetch(`${URL}/addQuestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 409) {
        setQidError('Question already exists'); 
        throw new Error('Question already exists');
      }

      if (!response.ok) {
        console.log(response);
        console.log(data);
        throw new Error(data.errors || data.error || 'Failed to add question');
      }
      navigate('message');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-1/2 mx-auto mt-3">
      <h2 className="text-xl font-bold mb-4">Add New Question</h2>

      {/* Question ID */}
      <div className="mb-4">
        <label htmlFor="QId" className="block font-semibold">Question ID:</label>
        <input
          type="number"
          id="QId"
          name="QId"
          value={formData.QId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {qidError && <p className="text-red-500 mt-2">{qidError}</p>} {/* Display error message here */}
      </div>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={7}
          required
        />
      </div>

      {/* Level */}
      <div className="mb-4">
        <label htmlFor="level" className="block font-semibold">Level:</label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Acceptance Rate */}
      <div className="mb-4">
        <label htmlFor="acceptanceRate" className="block font-semibold">Acceptance Rate:</label>
        <input
          type="number"
          id="acceptanceRate"
          name="acceptanceRate"
          value={formData.acceptanceRate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          step="0.1"
          required
        />
      </div>

      {/* Test Cases */}
      <div className="mb-4">
        <label className="block font-semibold">Test Cases:</label>
        {formData.testCases.map((testCase, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">Test Case {index + 1}</h3>

            {/* Test Case Input */}
            <label htmlFor={`input-${index}`} className="block">Input:</label>
            <textarea
              id={`input-${index}`}
              value={testCase.input}
              onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />

            {/* Test Case Output */}
            <label htmlFor={`output-${index}`} className="block">Output:</label>
            <textarea
              id={`output-${index}`}
              value={testCase.output}
              onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Remove Test Case */}
            <button
              type="button"
              onClick={() => removeTestCase(index)}
              className="text-red-500 mt-2"
            >
              Remove Test Case
            </button>
          </div>
        ))}

        {/* Add Test Case */}
        <button
          type="button"
          onClick={addTestCase}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Test Case
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Question'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>

    </>
  );
};

export default AddQuestionForm;
