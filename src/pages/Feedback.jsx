import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Feedback.css';
import { useNavigate } from 'react-router-dom';
import { 
  FiMail, 
  FiBriefcase, 
  FiUsers, 
  FiMapPin, 
  FiClock, 
  FiEdit2, 
  FiSave, 
  FiX, 
  FiChevronDown, 
  FiChevronRight,
  FiFileText,
  FiAward,
  FiCalendar,
  FiUser
} from 'react-icons/fi';

const Feedback = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    recipientId: '',
    message: '',
    category: 'general',
    isAnonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mockUserData = {
    employeeId: "EMP-004",
    fullName: "James Taylor",
    workEmail: "james.taylor@company.com",
    jobTitle: "Product Designer",
    department: "Product",
    managerId: "EMP-005",
    skipManagerId: "EMP-006",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    dateOfJoining: "2021-03-15",
    teamName: "Product Design",
    businessUnit: "Product Development",
    profileImage: null,
    isActive: true
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewFeedback(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback(prev => [...prev, {
        id: Date.now(),
        ...newFeedback,
        timestamp: new Date().toISOString(),
        sender: user.id
      }]);
      setNewFeedback({
        recipientId: '',
        message: '',
        category: 'general',
        isAnonymous: false
      });
    } catch (err) {
      setError('Failed to send feedback');
    } finally {
      setLoading(false);
    }
  };

  try {
    return (
      <div className="feedback-container">
        <div className="feedback-header">
          <h2>Give Feedback</h2>
          <p>Share your thoughts and suggestions with your colleagues</p>
        </div>

        <div className="feedback-content">
          <div className="feedback-form-container">
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="recipientId">Recipient</label>
                <input
                  type="text"
                  id="recipientId"
                  name="recipientId"
                  value={newFeedback.recipientId}
                  onChange={handleInputChange}
                  placeholder="Select a recipient from the organization structure"
                  required
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newFeedback.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="performance">Performance</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="leadership">Leadership</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={newFeedback.message}
                  onChange={handleInputChange}
                  placeholder="Write your feedback here..."
                  required
                  rows="5"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={newFeedback.isAnonymous}
                    onChange={handleInputChange}
                  />
                  Send anonymously
                </label>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('Error in Feedback component:', error);
    return (
      <div className="error-message">
        An error occurred while loading the feedback. Please try again later.
      </div>
    );
  }
};

export default Feedback; 