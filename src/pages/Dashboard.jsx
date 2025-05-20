import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (error) {
    return <div className="dashboard error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.firstName}!</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <p>Access your most frequently used features and tools.</p>
        </div>
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <p>View your recent interactions and updates.</p>
        </div>
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <p>Stay updated with important announcements and messages.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 