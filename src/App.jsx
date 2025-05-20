import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import FeedbackDashboard from './pages/FeedbackDashboard';
import FeedbackAnalysis from './components/FeedbackAnalysis';
import './App.css';

const App = () => {
  // Mock data for MVP analysis feature
  const mockAnalysisData = {
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

  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <main className="app-main">
                <Navigation />
                <Dashboard />
              </main>
            }
          />

          <Route
            path="/profile"
            element={
              <main className="app-main">
                <Navigation />
                <Profile />
              </main>
            }
          />

          <Route
            path="/feedback"
            element={
              <main className="app-main">
                <Navigation />
                <FeedbackDashboard />
              </main>
            }
          />

          <Route
            path="/analysis"
            element={
              <main className="app-main">
                <Navigation />
                <div className="analysis-page">
                  <FeedbackAnalysis feedback={mockAnalysisData} />
      </div>
              </main>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
