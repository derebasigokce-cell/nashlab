import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Solver from './pages/Solver';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import QuestionBuilder from './pages/QuestionBuilder';
import LessonBuilder from './pages/LessonBuilder';
import QuizBuilder from './pages/QuizBuilder';
import StudentAnalytics from './pages/StudentAnalytics';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) return null;
  
  // If not authenticated, always go to Auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  // Role check
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <Layout>{children}</Layout>;
};

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" />} />
      
      {/* Home / Dashboard */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Student Specific */}
      <Route path="/solver" element={<ProtectedRoute requiredRole="ogrenci"><Solver /></ProtectedRoute>} />
      <Route path="/lessons" element={<ProtectedRoute requiredRole="ogrenci"><Lessons /></ProtectedRoute>} />
      <Route path="/practice" element={<ProtectedRoute requiredRole="ogrenci"><Practice /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute requiredRole="ogrenci"><Analytics /></ProtectedRoute>} />

      {/* Teacher Specific */}
      <Route path="/question-builder" element={<ProtectedRoute requiredRole="ogretmen"><QuestionBuilder /></ProtectedRoute>} />
      <Route path="/lesson-builder" element={<ProtectedRoute requiredRole="ogretmen"><LessonBuilder /></ProtectedRoute>} />
      <Route path="/quiz-builder" element={<ProtectedRoute requiredRole="ogretmen"><QuizBuilder /></ProtectedRoute>} />
      <Route path="/student-analytics" element={<ProtectedRoute requiredRole="ogretmen"><StudentAnalytics /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
