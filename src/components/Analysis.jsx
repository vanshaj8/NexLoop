import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './Analysis.css';

const Analysis = ({ feedback }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const analyzeFeedback = async () => {
      try {
        // Simulate ChatGPT API call
        const mockAnalysis = {
          overallSentiment: 0.7,
          keyThemes: [
            { theme: 'Communication', sentiment: 0.8, frequency: 5 },
            { theme: 'Leadership', sentiment: 0.6, frequency: 3 },
            { theme: 'Time Management', sentiment: 0.4, frequency: 2 }
          ],
          improvementAreas: [
            { area: 'Meeting Punctuality', priority: 'High', description: 'Need to improve meeting start times' },
            { area: 'Project Updates', priority: 'Medium', description: 'Could enhance clarity in status reports' }
          ],
          strengths: [
            { area: 'Team Collaboration', description: 'Excellent at fostering team spirit' },
            { area: 'Problem Solving', description: 'Strong analytical skills' }
          ],
          recommendations: [
            'Implement time tracking tools',
            'Schedule regular team sync-ups',
            'Consider leadership training'
          ],
          actionItems: [
            { task: 'Set up time tracking system', priority: 'High', deadline: '2 weeks' },
            { task: 'Schedule weekly team meetings', priority: 'Medium', deadline: '1 week' },
            { task: 'Enroll in leadership workshop', priority: 'Low', deadline: '1 month' }
          ]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAnalysis(mockAnalysis);
      } catch (err) {
        setError('Failed to analyze feedback');
      } finally {
        setLoading(false);
      }
    };

    analyzeFeedback();
  }, [feedback]);

  if (loading) {
    return (
      <div className="analysis-container">
        <div className="analysis-loading">
          <FiBarChart2 className="loading-icon" />
          <p>Analyzing feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-container">
        <div className="analysis-error">
          <FiAlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <h2>Feedback Analysis</h2>
        <div className="sentiment-score">
          <span className="score">{Math.round(analysis.overallSentiment * 100)}%</span>
          <span className="label">Overall Sentiment</span>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card key-themes">
          <h3>Key Themes</h3>
          <div className="themes-list">
            {analysis.keyThemes.map((theme, index) => (
              <div key={index} className="theme-item">
                <div className="theme-header">
                  <span className="theme-name">{theme.theme}</span>
                  <span className={`theme-sentiment ${theme.sentiment >= 0.6 ? 'positive' : 'negative'}`}>
                    {theme.sentiment >= 0.6 ? <FiTrendingUp /> : <FiTrendingDown />}
                    {Math.round(theme.sentiment * 100)}%
                  </span>
                </div>
                <div className="theme-frequency">
                  Mentioned {theme.frequency} times
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card improvement-areas">
          <h3>Areas for Improvement</h3>
          <div className="improvement-list">
            {analysis.improvementAreas.map((area, index) => (
              <div key={index} className="improvement-item">
                <div className="improvement-header">
                  <span className="area-name">{area.area}</span>
                  <span className={`priority ${area.priority.toLowerCase()}`}>
                    {area.priority}
                  </span>
                </div>
                <p className="area-description">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card strengths">
          <h3>Strengths</h3>
          <div className="strengths-list">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="strength-item">
                <FiCheckCircle className="strength-icon" />
                <div className="strength-content">
                  <h4>{strength.area}</h4>
                  <p>{strength.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card recommendations">
          <h3>Recommendations</h3>
          <ul className="recommendations-list">
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-card action-items">
          <h3>Action Items</h3>
          <div className="action-items-list">
            {analysis.actionItems.map((item, index) => (
              <div key={index} className="action-item">
                <div className="action-header">
                  <span className="task">{item.task}</span>
                  <span className={`priority ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="action-footer">
                  <span className="deadline">Due: {item.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 