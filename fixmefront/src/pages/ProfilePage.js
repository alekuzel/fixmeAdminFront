import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

function ProfilePage() {
  const [adminData, setAdminData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const loggedInUserId = localStorage.getItem('id');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (loggedInUserId) {
      fetchAdminData();
    }
  }, [loggedInUserId]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);  // Match the key expected by the backend
    setUploading(true);
  
    try {
      const response = await axios.post(`http://localhost:3006/admins/${loggedInUserId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      alert(response.data.message);
  
      // Fetch the updated admin data
      const adminResponse = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
      if (adminResponse.data) {
        setAdminData(adminResponse.data);  // Update adminData to reflect new image path
      } else {
        console.error('Unexpected server response:', adminResponse.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <NavigationComp /> {/* This should have a class like col-lg-2 if it's defined in NavigationComp */}
      <div className="col-lg-10"> {/* This wraps Header and main content */}
        <Header />
        <div className="container mt-4">
              <h2>Profile Page</h2>
              {adminData ? (
                <div>
                  <p>ID: {adminData.id}</p>
                  <p>Name: {adminData.firstName} {adminData.lastName}</p>
                  <p>Email: {adminData.email}</p>
                  <p>Phone: {adminData.phoneNumber}</p>
                  <p>Username: {adminData.username}</p>
                  <p>Role: {adminData.role}</p>
                  <div>
                    <img src={adminData.avatarUrl || '/images/default-avatar.png'} alt="Avatar" style={{ width: 50, height: 50 }} />
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={handleUpload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default ProfilePage;
