import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackHistory from '../components/FeedbackHistory';
import { FiMessageSquare, FiClock, FiSend } from 'react-icons/fi';
import './FeedbackDashboard.css';

const FeedbackDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('give');
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availableRecipients, setAvailableRecipients] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetchFeedbackHistory();
      fetchAvailableRecipients();
    }
  }, [user]);

  const fetchAvailableRecipients = async () => {
    try {
      // TODO: Replace with actual API call
      const mockRecipients = [
        {
          id: '1',
          name: 'Sarah Johnson',
          title: 'Director',
          department: 'Engineering',
          relationship: 'skip-manager'
        },
        {
          id: '2',
          name: 'Michael Chen',
          title: 'Manager',
          department: 'Engineering',
          relationship: 'manager'
        },
        {
          id: '3',
          name: 'John Smith',
          title: 'Team Lead',
          department: 'Product',
          relationship: 'peer'
        }
      ];
      setAvailableRecipients(mockRecipients);
    } catch (err) {
      console.error('Error fetching recipients:', err);
      setError('Failed to fetch available recipients');
    }
  };

  const fetchFeedbackHistory = async () => {
    try {
      setLoading(true);
      setError('');
      // TODO: Replace with actual API call
      const mockFeedbackHistory = [
        {
          id: '1',
          type: 'given',
          recipientName: 'Sarah Johnson',
          recipientTitle: 'Director',
          timestamp: '2024-03-15T10:30:00Z',
          rating: 4,
          tags: ['Leadership', 'Communication'],
          message: 'Sarah has been an excellent leader, providing clear direction and support to the team.',
          status: 'submitted',
          isAnonymous: true
        },
        {
          id: '2',
          type: 'received',
          senderName: 'Michael Chen',
          senderTitle: 'Manager',
          timestamp: '2024-02-28T14:45:00Z',
          rating: 5,
          tags: ['Team Management', 'Support'],
          message: 'You have been instrumental in helping our team grow and develop.',
          status: 'reviewed',
          isAnonymous: false
        }
      ];
      setFeedbackHistory(mockFeedbackHistory);
    } catch (err) {
      setError('Failed to fetch feedback history');
      console.error('Error fetching feedback history:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="feedback-dashboard">
      <div className="dashboard-header">
        <h1>Feedback Dashboard</h1>
        <p className="dashboard-subtitle">Share your feedback with colleagues and track your feedback history</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'give' ? 'active' : ''}`}
          onClick={() => setActiveTab('give')}
        >
          <FiMessageSquare className="tab-icon" />
          <span>Give Feedback</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          <FiSend className="tab-icon" />
          <span>Request Feedback</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FiClock className="tab-icon" />
          <span>History</span>
        </button>
      </div>

      <div className="tab-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'give' && (
              <FeedbackForm
                type="give"
                availableRecipients={availableRecipients}
              />
            )}
            {activeTab === 'request' && (
              <FeedbackForm
                type="request"
                availableRecipients={availableRecipients}
              />
            )}
            {activeTab === 'history' && (
              <FeedbackHistory feedbackHistory={feedbackHistory} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackDashboard; 