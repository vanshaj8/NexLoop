import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo-container">
        <span className="logo-text">Nexloop</span>
        <span className="logo-tagline">Next + Feedback Loop</span>
      </div>
    </Link>
  );
};

export default Logo; 