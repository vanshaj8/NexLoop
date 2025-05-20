import React from 'react';
import './FeedbackHistory.css';

const FeedbackHistory = ({ feedbackHistory }) => {
  if (!feedbackHistory || feedbackHistory.length === 0) {
    return (
      <div className="feedback-history-empty">
        <p>No feedback history available.</p>
      </div>
    );
  }

  return (
    <div className="feedback-history-container">
      <div className="feedback-history-header">
        <h2>Feedback History</h2>
        <p>View your past feedback submissions</p>
      </div>

      <div className="feedback-list">
        {feedbackHistory.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-item-header">
              <div className="feedback-recipient">
                {feedback.type === 'given' ? (
                  <>
                    <span className="recipient-name">{feedback.recipientName}</span>
                    <span className="recipient-title">{feedback.recipientTitle}</span>
                  </>
                ) : (
                  <>
                    <span className="recipient-name">{feedback.senderName}</span>
                    <span className="recipient-title">{feedback.senderTitle}</span>
                  </>
                )}
              </div>
              <div className="feedback-meta">
                <span className="feedback-date">
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </span>
                <span className={`feedback-status ${feedback.status}`}>
                  {feedback.status}
                </span>
              </div>
            </div>

            <div className="feedback-content">
              {feedback.rating > 0 && (
                <div className="feedback-rating">
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`rating-star ${
                          star <= feedback.rating ? 'active' : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {feedback.tags && feedback.tags.length > 0 && (
                <div className="feedback-tags">
                  {feedback.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="feedback-message">{feedback.message}</div>

              {feedback.attachments && feedback.attachments.length > 0 && (
                <div className="feedback-attachments">
                  <h4>Attachments</h4>
                  <div className="attachments-list">
                    {feedback.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="attachment-link"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="feedback-footer">
                <span className="feedback-anonymity">
                  {feedback.isAnonymous ? 'Submitted anonymously' : 'Not anonymous'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackHistory; 