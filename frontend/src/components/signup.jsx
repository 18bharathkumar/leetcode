import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../url';

const SignUp = () => {
  // State to manage form inputs
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to manage form errors
  const [errors, setErrors] = useState({});

  // State to manage sign-up success or failure
  const [signUpError, setSignUpError] = useState('');

  // Use `useNavigate` to programmatically navigate the user after sign-up
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};
    if (!username) validationErrors.username = 'Username is required';
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';
    else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters';

    setErrors(validationErrors);

    // If no validation errors, proceed with the API request
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          // Handle successful sign-up
          console.log('Sign-up successful');
          // Reset form
          setUsername('');
          setEmail('');
          setPassword('');
          setSignUpError('');
          // Redirect to sign-in page or another page after sign-up
          navigate('/signin');
        } else {
          // Handle errors from the server (e.g., user already exists)
          const errorData = await response.json();
          setSignUpError(errorData.message || 'Sign-up failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
        setSignUpError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign Up</h2>
        {signUpError && <p className="text-red-500 text-center mb-4">{signUpError}</p>}
        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Link to Sign In */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
