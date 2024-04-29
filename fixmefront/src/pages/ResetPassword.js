import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState(''); // renamed from password to newPassword
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { 
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:3006/admins/password-reset', { email, token, newPassword }); 
      setMessage('Password reset successful');
      navigate('/login');
    } catch (error) {
      setMessage('Error resetting password');
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
      <label htmlFor="newPassword">New Password:</label> 
      <input
        type="password"
        id="newPassword" 
        value={newPassword} 
        onChange={(e) => setNewPassword(e.target.value)} 
      />
      <label htmlFor="confirmPassword">Confirm New Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ResetPassword;