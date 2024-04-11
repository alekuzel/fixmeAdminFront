import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container">
      <h2>Welcome to the dashboard</h2>
      {/* Add dashboard content here */}
      <p>Manage your admin tasks here.</p>
      {/* Add a link to the registration page */}
      <Link to="/register">Register New Admin</Link>
    </div>
  );
}

export default Dashboard;
