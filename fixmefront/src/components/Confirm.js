import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmRegistration = () => {
  const { token } = useParams(); // Extract token from URL params
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