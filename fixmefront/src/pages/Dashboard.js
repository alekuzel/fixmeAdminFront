import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import NavigationComp from '../components/NavigationComp';

function Dashboard() {
  const [stats, setStats] = useState({
    admins: 0,
    supportAdmins: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: admins } = await axios.get('http://localhost:3006/admins');
        const { data: users } = await axios.get('http://localhost:3006/users');
        const adminCount = admins.length;
        const supportAdminCount = admins.filter(admin => admin.role === 'support').length;
        const userCount = users.length;
        setStats({ admins: adminCount, supportAdmins: supportAdminCount, users: userCount });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Welcome to the dashboard</h2>
            <p>Manage your admin tasks here.</p>
            <h2>Currently there are:</h2>
            <div className="d-flex justify-content-around">
              <div className="text-center">
                <div className="circle bg-primary text-white p-5 d-flex align-items-center justify-content-center flex-column" style={{ borderRadius: '50%', width: '130px', height: '130px' }}>
                  <h2>{stats.admins}</h2>
                  <p>Admins</p>
                </div>
              </div>
              <div className="text-center">
                <div className="circle bg-success text-white p-5 d-flex align-items-center justify-content-center flex-column" style={{ borderRadius: '50%', width: '130px', height: '130px' }}>
                  <h2>{stats.supportAdmins}</h2>
                  <p>Support Admins</p>
                </div>
              </div>
              <div className="text-center">
                <div className="circle bg-info text-white p-5 d-flex align-items-center justify-content-center flex-column" style={{ borderRadius: '50%', width: '130px', height: '130px' }}>
                  <h2>{stats.users}</h2>
                  <p>Users</p>
                </div>
              </div>
            </div>
            <Link to="/register" className="mt-4">Register New Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

//status in different colors, make admin, support data editable. 
//fix image uploads!
//fix differences in what admin, support and superadmin may see
//news table, CRUD and page just for fun. admins may post, supports only read
//functionality to change password
//filter by status and by something else