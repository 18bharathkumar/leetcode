// src/pages/SignIn.jsx
import URL from '../url';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  // Initialize useNavigate hook inside the component
  const navigate = useNavigate();

  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole] = useState('user');

  // State to manage form errors
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // For server-side errors

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
       
        const response = await fetch(`${URL}/user/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password,role}),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          console.log('Token stored:', data.token);
          //reload to get usename and logout
          navigate('/home');
          window.location.reload();
          // Redirect to home page after successful sign-in
          
          
          // Optionally, reset form
          setEmail('');
          setPassword('');
        } else {
          // Handle server-side errors
          setServerError(data.message || 'Sign-in failed. Please try again.');
        }
      } catch (error) {
        console.log(error);
        setServerError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign In</h2>

        {/* Display server error */}
        {serverError && (
          <div className="text-red-500 text-center mb-4">
            {serverError}
          </div>
        )}

<form className="mt-6" onSubmit={handleSubmit} noValidate>
  {/* Role Selection (User/Admin) */}
  <div className="mb-4">
    <label className="block text-gray-600">Select Role</label>
    <div className="flex items-center mt-2">
      <input
        type="radio"
        id="user"
        name="role"
        value={role}
        checked={role === 'user'}
        onChange={(e) => setRole(e.target.value)}
        className="mr-2"
      />
      <label htmlFor="user" className="mr-4 text-gray-600">User</label>

      <input
        type="radio"
        id="admin"
        name="role"
        value="admin"
        checked={role === 'admin'}
        onChange={(e) => setRole(e.target.value)}
        className="mr-2"
      />
      <label htmlFor="admin" className="text-gray-600">Admin</label>
    </div>
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
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
    >
      Sign In
    </button>
  </div>
</form>


        {/* Link to Sign Up */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
