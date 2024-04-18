import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [adminData, setAdminData] = useState(null);
  const loggedInUserId = localStorage.getItem('id'); // Retrieve the logged-in user's ID from local storage

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        
      }
    };
    console.log(loggedInUserId);
    if (loggedInUserId) {
      fetchAdminData();
    }
  }, [loggedInUserId]);

  return (
    <div className="container">
      <h2>Profile Page</h2>
      {adminData ? (
        <div>
          <p>ID: {adminData.id}</p>
          <p>Username: {adminData.username}</p>
          <p>Role: {adminData.role}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
        
      )}
    </div>
  );
}

export default ProfilePage;
