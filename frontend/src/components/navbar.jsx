// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, HomeIcon, ClipboardListIcon } from '@heroicons/react/outline';
import fetchprofile from '../fetch/fetchuserdata';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const [userName, setUserName] = useState(null); // State to store user's name
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // Hook for navigation

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 

useEffect(() => {
  const loadUserProfile = async () => {
    try {
      const data = await fetchprofile(); // Await the fetch
      if (data) {
        setUserName(data.name); // Set the user's name
      } else {
        setUserName(null);
        navigate('/signin')
      }
    } catch (error) {
      console.error("Error fetching profile:", error); // Log errors if fetch fails
    } finally {
      setIsLoading(false); // Set loading to false once the data has been fetched or an error occurs
    }
  };

  loadUserProfile(); // Call the function inside useEffect
}, []);


  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUserName(null); // Reset user state
    navigate('/signin'); // Redirect to Sign In page
  };

  // Class names for active and inactive links
  const navLinkClasses1 = ({ isActive }) =>
    isActive
      ? 'flex items-center px-4 py-2 rounded-full text-white bg-blue-800 shadow-md transition duration-200 ease-in-out transform scale-105'
      : 'flex items-center px-4 py-2 rounded-full text-white hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out';

  const navLinkClasses2 = ({ isActive }) =>
    isActive
      ? 'flex items-center px-4 py-2 rounded-full text-white bg-blue-800 shadow-md transition duration-200 ease-in-out transform scale-105 m-2'
      : 'flex items-center px-4 py-2 rounded-full text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out';

  if (isLoading) {
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 md:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white md:text-blue-600 font-bold text-xl flex items-center">
                <HomeIcon className="h-6 w-6 mr-2 text-white md:text-blue-600" />
                Meetcode
              </span>
            </div>

            {/* Loading Indicator */}
            <div className="flex items-center">
              <span className="text-white">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 md:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white md:text-gary-600 font-bold text-xl flex items-center">
              Meetcode
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/home" className={navLinkClasses1}>
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </NavLink>
              <NavLink to="/problems" className={navLinkClasses1}>
                <ClipboardListIcon className="h-5 w-5 mr-1" />
                Problems
              </NavLink>

              {/* Conditional Rendering Based on Authentication */}
              {userName ? (
                <>
                <Link to = '/profile'>
                  <span className="text-white ml-4 underline hover:cursor-pointer">{userName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-full text-white hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="text-white underline underline-offset-1 mr-5 transition duration-300 hover:text-indigo-900 hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:scale-105 pl-3 pr-3 rounded-full"
                  >
                    Enter
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="text-white underline underline-offset-1 mr-5 transition duration-300 hover:text-indigo-900 hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:scale-105 pl-3 pr-3 rounded-full"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-200 hover:text-white focus:outline-none focus:text-white transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-4 pt-4 pb-4 space-y-4 bg-white text-gray-800 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform scale-105">
            <NavLink
              to="/home"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses2}
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </NavLink>
            <NavLink
              to="/problems"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses2}
            >
              <ClipboardListIcon className="h-5 w-5 mr-1" />
              Problems
            </NavLink>

            
          </div>
        </div>
      )}

      {/* Mobile Links Below Navbar */}
      <div className="md:hidden flex justify-end px-4 py-2 bg-white">
        {userName ? (
          <>
          <Link to='/profile'> <span className="text-gray-800 font-semibold mr-4">{userName}</span></Link>
           
            <button
              onClick={handleLogout}
              className="text-gray-800 font-semibold transition duration-300 hover:text-blue-800 underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className="text-gray-800 font-semibold mr-4 transition duration-300 hover:text-blue-800 underline">
              Enter
            </NavLink>
            <NavLink to="/signup" className="text-gray-800 font-semibold transition duration-300 hover:text-blue-800 underline">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
