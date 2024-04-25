import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation instead of useParams
import axios from 'axios';

const ConfirmRegistration = () => {
  // Replace useParams with useLocation and URLSearchParams
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        // Send a request to the backend to confirm registration with the token
        const response = await axios.post('http://localhost:3006/admins/confirm-registration', { token });
        setConfirmationMessage(response.data.message);
        setUsername(response.data.username); // Set the username in the state
      } catch (error) {
        console.log('token', token);
        setConfirmationMessage('Failed to confirm registration. Please try again.');
      }
    };

    // Call confirmRegistration when the component mounts
    confirmRegistration();
  }, [token]);

  return (
    <div className="container">
      <h2>Registration Confirmation</h2>
      <p>{confirmationMessage}</p>
      {username && <p>Your username is: {username}</p>} {/* Display the username if it's set */}
    </div>
  );
};

export default ConfirmRegistration;