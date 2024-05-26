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
        <div className="col-lg-10" style={{ paddingLeft: '300px' }}>
          <Header />
        
          <div className="dashboard-content">
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
           
            <div className="new-content">
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card">
                    <img src="images/picone.png" className="card-img-top" alt="News 1" />
                    <div className="card-body">
                      <h5 className="card-title">News Title 1</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <Link to="/news-1" className="btn btn-primary">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img src="images/picthree.png" className="card-img-top" alt="News 2" />
                    <div className="card-body">
                      <h5 className="card-title">News Title 2</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                      <Link to="/news-2" className="btn btn-primary">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img src="images/pictwo.png" className="card-img-top" alt="News 3" />
                    <div className="card-body">
                      <h5 className="card-title">News Title 3</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <Link to="/news-3" className="btn btn-primary">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
