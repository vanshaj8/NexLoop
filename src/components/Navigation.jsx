import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiUser, FiMessageSquare, FiBarChart2, FiLogOut, FiMenu } from 'react-icons/fi';
import './Navigation.css';

// Icons
const HomeIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20a1 1 0 001 1h14a1 1 0 001-1V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V20a3 3 0 01-3 3H5a3 3 0 01-3-3V7.577a2 2 0 011-1.732l7.5-4.33z"></path>
  </svg>
);

const FeedbackIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path>
    <path d="M14 2v6h6"></path>
  </svg>
);

const TeamIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
  </svg>
);

const AdminIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <FiMenu />
      </button>
      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-logo">
          <h1>NexLoop</h1>
        </div>
        <ul className="nav-links">
          <li className={isActiveRoute('/dashboard') ? 'active' : ''}>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <FiHome className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActiveRoute('/profile') ? 'active' : ''}>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              <FiUser className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li className={isActiveRoute('/feedback') ? 'active' : ''}>
            <Link to="/feedback" onClick={() => setIsMenuOpen(false)}>
              <FiMessageSquare className="nav-icon" />
              <span>Feedback</span>
            </Link>
          </li>
          <li className={isActiveRoute('/analysis') ? 'active' : ''}>
            <Link to="/analysis" onClick={() => setIsMenuOpen(false)}>
              <FiBarChart2 className="nav-icon" />
              <span>Analysis</span>
            </Link>
          </li>
        </ul>
        <div className="nav-footer">
          <button onClick={handleLogout} className="logout-button">
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation; 