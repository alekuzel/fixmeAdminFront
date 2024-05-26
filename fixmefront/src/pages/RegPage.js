import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp'; // Import NavigationComp
import Header from '../components/Header';

const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [twoFactorEnabled, setTwoFactorAuth] = useState(false);
  const [error, setError] = useState('');
  const [registrationCompleted, setRegistrationCompleted] = useState(false); // Track registration completion
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', password);
    formData.append('role', role);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('twoFactorEnabled', twoFactorEnabled ? 1 : 0);
  
    try {
      const response = await axios.post('http://localhost:3006/admins/register', formData);
      // Assume the server responds with a success message upon registration
      setRegistrationCompleted(true); // Set registration completion state to true
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  const handleConfirmation = () => {
    // Handle confirmation action, e.g., redirect to login page
    navigate('/login'); // Example redirect to login page after confirmation
  };

  // If registration is completed, show confirmation message
  if (registrationCompleted) {
    return (
      <div className="container-fluid">
        <div className="row">
          <NavigationComp /> {/* Include NavigationComp here */}
          <div className="col-lg-10">
            <div className="container">
              <h2>Registration Successful</h2>
              <p>Please check your email for confirmation.</p>
              <button onClick={handleConfirmation} className="btn btn-primary">Go to Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show registration form
  return (
    <div className="container-fluid">
    <div className="row">
      <NavigationComp /> {/* This should have a class like col-lg-2 if it's defined in NavigationComp */}
      <div className="col-lg-10"> {/* This wraps Header and main content */}
        <Header />
        <main>
        <div className="container mt-4">
            <h2>Admin Registration</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
          <label htmlFor="firstName">Name:</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          className="form-control"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="support">Support</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>
        <div className="form-group">
          <label htmlFor="twoFactorEnabled">Two Factor Authentication Enabled:</label>
          <input type="checkbox" id="twoFactorEnabled" checked={twoFactorEnabled} onChange={(e) => setTwoFactorAuth(e.target.checked)} />
        </div>
       
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
          </main>
        </div>
      </div>
    </div>
    
  );
};

export default RegistrationForm;



