/**
 * Main App Component - Updated with all routes
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navigation from './components/common/Navigation';
import { ToastContainer } from './components/common/Toast';
import useToast from './hooks/useToast';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Login, Register } from './components/auth/AuthPages';
import Dashboard from './components/dashboard/Dashboard';
import CampaignList from './components/campaign/CampaignList';
import ContentGenerator from './components/content/ContentGenerator';
import LeadManagement from './components/leads/LeadManagement';
import SEOToolkit from './components/seo/SEOToolkit';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import './styles/globals.css';

const AppContent = () => {
  const { toasts, removeToast } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {isAuthenticated && <Navigation />}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <CampaignList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns/new"
            element={
              <ProtectedRoute>
                <CampaignList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns/:id"
            element={
              <ProtectedRoute>
                <CampaignList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <ContentGenerator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <LeadManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seo"
            element={
              <ProtectedRoute>
                <SEOToolkit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
