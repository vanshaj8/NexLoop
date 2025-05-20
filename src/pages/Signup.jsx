import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Validate username
    setValidation(prev => ({
      ...prev,
      username: formData.username.length >= 3 && formData.username.length <= 20
    }));
  }, [formData.username]);

  useEffect(() => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation(prev => ({
      ...prev,
      email: emailRegex.test(formData.email)
    }));
  }, [formData.email]);

  useEffect(() => {
    // Validate password
    setValidation(prev => ({
      ...prev,
      password: formData.password.length >= 8
    }));
  }, [formData.password]);

  useEffect(() => {
    // Validate confirm password
    setValidation(prev => ({
      ...prev,
      confirmPassword: formData.password === formData.confirmPassword && formData.confirmPassword.length >= 8
    }));
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validation.username || !validation.email || !validation.password || !validation.confirmPassword) {
      setError('Please fill in all fields correctly');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'employee' // Default role for new users
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Join our HR platform and get started</p>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Account Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`form-input ${validation.username ? 'valid' : formData.username ? 'invalid' : ''}`}
                    placeholder="Choose a username"
                    minLength="3"
                    maxLength="20"
                  />
                  {formData.username && (
                    <span className={`validation-icon ${validation.username ? 'valid' : 'invalid'}`}>
                      {validation.username ? '✓' : '✕'}
                    </span>
                  )}
                </div>
                <span className="input-hint">3-20 characters</span>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`form-input ${validation.email ? 'valid' : formData.email ? 'invalid' : ''}`}
                    placeholder="Enter your email"
                  />
                  {formData.email && (
                    <span className={`validation-icon ${validation.email ? 'valid' : 'invalid'}`}>
                      {validation.email ? '✓' : '✕'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Security</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`form-input ${validation.password ? 'valid' : formData.password ? 'invalid' : ''}`}
                    placeholder="Create a password"
                    minLength="8"
                  />
                  {formData.password && (
                    <span className={`validation-icon ${validation.password ? 'valid' : 'invalid'}`}>
                      {validation.password ? '✓' : '✕'}
                    </span>
                  )}
                </div>
                <span className="input-hint">Minimum 8 characters</span>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`form-input ${validation.confirmPassword ? 'valid' : formData.confirmPassword ? 'invalid' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {formData.confirmPassword && (
                    <span className={`validation-icon ${validation.confirmPassword ? 'valid' : 'invalid'}`}>
                      {validation.confirmPassword ? '✓' : '✕'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${Object.values(validation).every(v => v) ? 'active' : ''}`} 
            disabled={loading || !Object.values(validation).every(v => v)}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 