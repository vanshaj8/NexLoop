import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiAlertCircle, FiThumbsUp, FiTarget } from 'react-icons/fi';
import './FeedbackAnalysis.css';

const FeedbackAnalysis = ({ feedback }) => {
  const [analysis, setAnalysis] = useState({
    overallSentiment: 0,
    improvementAreas: [],
    strengths: [],
    recommendations: [],
    actionItems: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeFeedback = async () => {
      try {
        // Simulate API call to ChatGPT
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This would be replaced with actual ChatGPT API call
        const mockAnalysis = {
          overallSentiment: 0.7,
          improvementAreas: [
            { area: 'Time Management', description: 'Need to improve meeting punctuality and deadline adherence' },
            { area: 'Communication', description: 'Could enhance clarity in project updates' }
          ],
          strengths: [
            { area: 'Leadership', description: 'Excellent team motivation and guidance' },
            { area: 'Problem Solving', description: 'Strong analytical and solution-oriented approach' }
          ],
          recommendations: [
            'Implement time tracking tools for better deadline management',
            'Schedule regular team sync-ups for project updates',
            'Consider leadership training for team management skills'
          ],
          actionItems: [
            { task: 'Set up time tracking system', priority: 'High', deadline: '2 weeks' },
            { task: 'Schedule weekly team meetings', priority: 'Medium', deadline: '1 week' },
            { task: 'Enroll in leadership workshop', priority: 'Low', deadline: '1 month' }
          ]
        };

        setAnalysis(mockAnalysis);
      } catch (error) {
        console.error('Error analyzing feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    if (feedback) {
      analyzeFeedback();
    }
  }, [feedback]);

  if (loading) {
    return (
      <div className="analysis-container">
        <div className="analysis-loading">
          <div className="spinner"></div>
          <span>Analyzing feedback...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <h2>Feedback Analysis</h2>
        <p>AI-powered insights and recommendations</p>
      </div>

      <div className="analysis-grid">
        <div className="analysis-card sentiment-card">
          <div className="card-header">
            <FiTrendingUp />
            <h3>Overall Sentiment</h3>
          </div>
          <div className="sentiment-score">
            <div className="score-circle">
              <span>{Math.round(analysis.overallSentiment * 100)}%</span>
              <div className="score-label">Positive</div>
            </div>
          </div>
        </div>

        <div className="analysis-card improvement-card">
          <div className="card-header">
            <FiAlertCircle />
            <h3>Areas for Improvement</h3>
          </div>
          <div className="card-content">
            {analysis.improvementAreas.map((item, index) => (
              <div key={index} className="improvement-item">
                <h4>{item.area}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card strengths-card">
          <div className="card-header">
            <FiThumbsUp />
            <h3>Key Strengths</h3>
          </div>
          <div className="card-content">
            {analysis.strengths.map((item, index) => (
              <div key={index} className="strength-item">
                <h4>{item.area}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-card recommendations-card">
          <div className="card-header">
            <FiTarget />
            <h3>Recommendations</h3>
          </div>
          <div className="card-content">
            <ul>
              {analysis.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="analysis-card action-items-card">
          <div className="card-header">
            <FiTarget />
            <h3>Action Items</h3>
          </div>
          <div className="card-content">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {analysis.actionItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.task}</td>
                    <td>
                      <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td>{item.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalysis; 