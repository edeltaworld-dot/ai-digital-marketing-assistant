/**
 * Main App Component
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/common/Navigation';
import { ToastContainer } from './components/common/Toast';
import useToast from './hooks/useToast';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Login, Register } from './components/auth/AuthPages';
import Dashboard from './components/dashboard/Dashboard';
import CampaignList from './components/campaign/CampaignList';
import './styles/globals.css';

const AppContent = () => {
  const { toasts, removeToast } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex">
      {isAuthenticated && <Navigation />}
      <main className="flex-1">
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
        </Routes>
      </main>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

const useAuth = () => {
  const { useAuth: useAuthHook } = require('./hooks/useAuth');
  return useAuthHook();
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
