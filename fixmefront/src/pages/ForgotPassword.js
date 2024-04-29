import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3006/admins/forgot-password', { email });
      setMessage('Password reset email sent');
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Password Reset Email</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ForgotPassword;