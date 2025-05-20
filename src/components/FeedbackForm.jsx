import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiStar, FiUpload, FiCheck, FiX, FiPlus, FiUser, FiUsers, FiEdit2, FiInfo } from 'react-icons/fi';
import FeedbackAnalysis from './FeedbackAnalysis';
import './FeedbackForm.css';

const FeedbackForm = ({ type, availableRecipients, onFeedbackSubmit }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState({
    recipientId: '',
    recipientName: '',
    recipientTitle: '',
    relationship: '',
    goals: [],
    message: '',
    attachments: [],
    isAnonymous: true,
    sentimentScore: 0,
    sentimentAnalysis: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  const [availableTags, setAvailableTags] = useState([
    { id: '1', name: 'Leadership', description: 'Ability to guide and inspire others', category: 'behavioral' },
    { id: '2', name: 'Communication', description: 'Effective exchange of information', category: 'behavioral' },
    { id: '3', name: 'Team Collaboration', description: 'Working effectively with others', category: 'behavioral' },
    { id: '4', name: 'Problem Solving', description: 'Analyzing and resolving issues', category: 'technical' },
    { id: '5', name: 'Innovation', description: 'Creative thinking and new ideas', category: 'technical' },
    { id: '6', name: 'Adaptability', description: 'Adjusting to change and challenges', category: 'behavioral' },
    { id: '7', name: 'Time Management', description: 'Efficient use of time and resources', category: 'behavioral' }
  ]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  const handleRecipientSelect = (recipient) => {
    setFeedback(prev => ({
      ...prev,
      recipientId: recipient.id,
      recipientName: recipient.name,
      recipientTitle: recipient.title,
      relationship: recipient.relationship
    }));
  };

  const handleTagSelect = (tag) => {
    if (feedback.goals.length >= 5 && !feedback.goals.find(g => g.id === tag.id)) {
      setError('Maximum 5 goals can be selected');
      return;
    }

    setFeedback(prev => {
      const existingGoal = prev.goals.find(g => g.id === tag.id);
      if (existingGoal) {
        return {
          ...prev,
          goals: prev.goals.filter(g => g.id !== tag.id)
        };
      } else {
        return {
          ...prev,
          goals: [...prev.goals, { 
            ...tag, 
            rating: 0, 
            comment: '',
            sentiment: {
              score: 0,
              keywords: [],
              summary: ''
            }
          }]
        };
      }
    });
  };

  const handleGoalChange = (goalId, field, value) => {
    setFeedback(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === goalId ? { ...goal, [field]: value } : goal
      )
    }));
  };

  const addNewTag = () => {
    if (newTag.trim() && !availableTags.find(t => t.name.toLowerCase() === newTag.toLowerCase())) {
      const newTagObj = {
        id: Date.now().toString(),
        name: newTag,
        description: newTagDescription.trim() || 'Custom goal',
        isCustom: true,
        category: 'custom'
      };
      setAvailableTags(prev => [...prev, newTagObj]);
      setNewTag('');
      setNewTagDescription('');
      setShowNewTagInput(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFeedback(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFeedback(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const analyzeSentiment = async (text) => {
    // This would be replaced with actual API call to ChatGPT
    return {
      score: Math.random() * 2 - 1, // Simulated sentiment score between -1 and 1
      keywords: ['positive', 'constructive', 'improvement'],
      summary: 'Overall positive feedback with constructive suggestions'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!feedback.recipientId) {
        throw new Error('Please select a recipient');
      }
      if (feedback.goals.length === 0) {
        throw new Error('Please select at least one goal');
      }
      if (!feedback.message.trim()) {
        throw new Error('Please enter a message');
      }

      // Analyze sentiment for each goal's comment
      const goalsWithSentiment = await Promise.all(
        feedback.goals.map(async (goal) => {
          if (goal.comment) {
            const sentiment = await analyzeSentiment(goal.comment);
            return { ...goal, sentiment };
          }
          return goal;
        })
      );

      // Analyze overall message sentiment
      const overallSentiment = await analyzeSentiment(feedback.message);

      const formData = new FormData();
      formData.append('type', type);
      formData.append('recipientId', feedback.recipientId);
      formData.append('relationship', feedback.relationship);
      formData.append('goals', JSON.stringify(goalsWithSentiment));
      formData.append('message', feedback.message);
      formData.append('isAnonymous', feedback.isAnonymous);
      formData.append('sentimentScore', overallSentiment.score);
      formData.append('sentimentAnalysis', JSON.stringify(overallSentiment));
      
      feedback.attachments.forEach(file => {
        formData.append('attachments', file);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const feedbackData = {
        ...feedback,
        goals: goalsWithSentiment,
        sentimentScore: overallSentiment.score,
        sentimentAnalysis: overallSentiment
      };

      if (onFeedbackSubmit) {
        onFeedbackSubmit(feedbackData);
      }

      setSubmittedFeedback(feedbackData);
      setShowAnalysis(true);
      setSuccess(type === 'give' ? 'Feedback submitted successfully' : 'Feedback request sent successfully');
      
      // Reset form
      setFeedback({
        recipientId: '',
        recipientName: '',
        recipientTitle: '',
        relationship: '',
        goals: [],
        message: '',
        attachments: [],
        isAnonymous: true,
        sentimentScore: 0,
        sentimentAnalysis: {}
      });
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="form-header">
        <h2>{type === 'give' ? 'Give Feedback' : 'Request Feedback'}</h2>
        <p className="form-subtitle">
          {type === 'give' 
            ? 'Share your feedback with a colleague' 
            : 'Request feedback from your colleagues'}
        </p>
      </div>
      
      {error && (
        <div className="error-message">
          <FiX className="error-icon" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="success-message">
          <FiCheck className="success-icon" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-section">
          <div className="form-group">
            <label>Select Recipient</label>
            <div className="org-chart">
              {availableRecipients.map(recipient => (
                <div
                  key={recipient.id}
                  className={`recipient-card ${feedback.recipientId === recipient.id ? 'selected' : ''}`}
                  onClick={() => handleRecipientSelect(recipient)}
                >
                  <div className="recipient-avatar">
                    <FiUser />
                  </div>
                  <div className="recipient-info">
                    <h3>{recipient.name}</h3>
                    <p>{recipient.title}</p>
                    <span className="recipient-department">{recipient.department}</span>
                  </div>
                  <div className="recipient-relationship">
                    {recipient.relationship === 'manager' ? 'Manager' : 
                     recipient.relationship === 'skip-manager' ? 'Skip Manager' : 'Peer'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedback.recipientId && (
            <div className="form-group">
              <label>Select Goals</label>
              <div className="tags-container">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`tag ${feedback.goals.find(g => g.id === tag.id) ? 'selected' : ''}`}
                    onClick={() => handleTagSelect(tag)}
                    disabled={loading}
                  >
                    {tag.name}
                    {tag.isCustom && <FiEdit2 className="custom-tag-icon" />}
                    <span className="tag-category">{tag.category}</span>
                  </button>
                ))}
                {feedback.goals.length < 5 && (
                  <button
                    type="button"
                    className="tag add-tag"
                    onClick={() => setShowNewTagInput(true)}
                  >
                    <FiPlus />
                    Add Custom Goal
                  </button>
                )}
              </div>
              {showNewTagInput && (
                <div className="new-tag-input">
                  <div className="new-tag-fields">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter goal name"
                    />
                    <textarea
                      value={newTagDescription}
                      onChange={(e) => setNewTagDescription(e.target.value)}
                      placeholder="Enter goal description"
                      rows="3"
                    />
                    <div className="description-tip">
                      <FiInfo />
                      <span>This description will be used for sentiment analysis and feedback insights</span>
                    </div>
                  </div>
                  <div className="new-tag-buttons">
                    <button type="button" onClick={addNewTag}>Add</button>
                    <button type="button" onClick={() => {
                      setShowNewTagInput(false);
                      setNewTag('');
                      setNewTagDescription('');
                    }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {feedback.goals.length > 0 && (
            <div className="goals-section">
              {feedback.goals.map(goal => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-header">
                    <h3>{goal.name}</h3>
                    {goal.isCustom && <span className="custom-badge">Custom</span>}
                    <span className="goal-category">{goal.category}</span>
                  </div>
                  <p className="goal-description">{goal.description}</p>
                  <div className="goal-rating">
                    <label>Rating</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={`rating-star ${star <= goal.rating ? 'active' : ''}`}
                          onClick={() => handleGoalChange(goal.id, 'rating', star)}
                          disabled={loading}
                        >
                          <FiStar />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="goal-comment">
                    <label>Comments</label>
                    <textarea
                      value={goal.comment}
                      onChange={(e) => handleGoalChange(goal.id, 'comment', e.target.value)}
                      placeholder={`Share your feedback about ${goal.name}`}
                      disabled={loading}
                    />
                    {goal.sentiment && goal.sentiment.score !== 0 && (
                      <div className="sentiment-indicator">
                        <div 
                          className="sentiment-bar" 
                          style={{ 
                            width: `${(goal.sentiment.score + 1) * 50}%`,
                            backgroundColor: goal.sentiment.score > 0 ? '#1DB954' : '#e53e3e'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Overall Feedback</label>
            <textarea
              id="message"
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              required
              placeholder="Share your overall feedback..."
              disabled={loading}
              className="message-textarea"
            />
            {feedback.sentimentScore !== 0 && (
              <div className="sentiment-indicator">
                <div 
                  className="sentiment-bar" 
                  style={{ 
                    width: `${(feedback.sentimentScore + 1) * 50}%`,
                    backgroundColor: feedback.sentimentScore > 0 ? '#1DB954' : '#e53e3e'
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="attachments" className="file-upload-label">
              <FiUpload className="upload-icon" />
              <span>Attach Files</span>
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileUpload}
                disabled={loading}
                className="file-input"
              />
            </label>
            {feedback.attachments.length > 0 && (
              <div className="attachments-list">
                {feedback.attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-attachment"
                      onClick={() => removeAttachment(index)}
                      disabled={loading}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={feedback.isAnonymous}
                onChange={(e) => setFeedback(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                disabled={loading}
                className="anonymous-checkbox"
              />
              <span>Submit anonymously</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <div className="button-loading">
              <div className="spinner"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            type === 'give' ? 'Submit Feedback' : 'Request Feedback'
          )}
        </button>
      </form>

      {showAnalysis && submittedFeedback && (
        <div className="analysis-section">
          <FeedbackAnalysis feedback={submittedFeedback} />
        </div>
      )}
    </div>
  );
};

export default FeedbackForm; 