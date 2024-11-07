import React, { useEffect, useState } from "react";
import fetchprofile from "../fetch/fetchuserdata";
import UserProfile from "./user/userprofile";
import AdminProfile from "./admin/adminprofile";

const Profile = () => {
  const [data, setData] = useState(null); // Initialize state for the profile data
  const [error, setError] = useState(false); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await fetchprofile(); // Await the fetch
        setData(userdata); // Update the state with fetched data
      } catch (err) {
        console.error(err);
        setError(true); // Set error state to true if fetching fails
      }
    };
    fetchData(); // Call the function inside useEffect
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (error) {
    return (
      <h1 className="text-red-400 text-4xl">Server error</h1>
    );
  }

  if (data) {
    if (data.role === 'admin') {
      return <AdminProfile data={data} />;
    } else {
      return <UserProfile data={data} />;
    }
  }

  // Return a loading state while fetching the data
  return (
    <h1 className="text-blue-400 text-4xl">Loading...</h1>
  );
};

export default Profile;
