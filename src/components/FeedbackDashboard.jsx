import React from 'react';
import './FeedbackDashboard.css';

const FeedbackDashboard = ({ feedbackData }) => {
  // Calculate average rating
  const averageRating = feedbackData.reduce((acc, curr) => acc + curr.overallRating, 0) / feedbackData.length;

  // Group feedback by relationship type
  const feedbackByType = feedbackData.reduce((acc, curr) => {
    if (!acc[curr.relationshipType]) {
      acc[curr.relationshipType] = [];
    }
    acc[curr.relationshipType].push(curr);
    return acc;
  }, {});

  return (
    <div className="feedback-dashboard">
      <h2>360° Feedback Summary</h2>
      
      <div className="overall-rating">
        <h3>Overall Rating</h3>
        <div className="rating-display">
          <span className="rating-value">{averageRating.toFixed(1)}</span>
          <span className="rating-scale">/10</span>
        </div>
      </div>

      {Object.entries(feedbackByType).map(([type, feedbacks]) => (
        <div key={type} className="feedback-section">
          <h3>{type} Feedback</h3>
          <div className="feedback-list">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-header">
                  <span className="feedback-source">
                    {feedback.isAnonymous ? 'Anonymous' : feedback.relationshipType}
                  </span>
                  <span className="feedback-date">
                    {new Date(feedback.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="feedback-content">
                  <div className="feedback-section">
                    <h4>Strengths</h4>
                    <p>{feedback.strengths}</p>
                  </div>
                  
                  <div className="feedback-section">
                    <h4>Areas for Improvement</h4>
                    <p>{feedback.areasForImprovement}</p>
                  </div>
                  
                  <div className="feedback-section">
                    <h4>Specific Examples</h4>
                    <p>{feedback.specificExamples}</p>
                  </div>
                  
                  <div className="feedback-rating">
                    <span>Rating: </span>
                    <span className="rating-value">{feedback.overallRating}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackDashboard; 