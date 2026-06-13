/**
 * API Service
 * Centralized HTTP client for all API requests
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.post('/auth/change-password', data),
};

// Campaign API
export const campaignAPI = {
  create: (data) => api.post('/campaigns', data),
  getAll: (filters) => api.get('/campaigns', { params: filters }),
  getById: (id) => api.get(`/campaigns/${id}`),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  delete: (id) => api.delete(`/campaigns/${id}`),
  updateStatus: (id, status) => api.patch(`/campaigns/${id}/status`, { status }),
  updateMetrics: (id, data) => api.patch(`/campaigns/${id}/metrics`, data),
  getStats: () => api.get('/campaigns/stats/overview'),
};

// Content API
export const contentAPI = {
  create: (data) => api.post('/content', data),
  getAll: (filters) => api.get('/content', { params: filters }),
  getById: (id) => api.get(`/content/${id}`),
  update: (id, data) => api.put(`/content/${id}`, data),
  delete: (id) => api.delete(`/content/${id}`),
  updateStatus: (id, status) => api.patch(`/content/${id}/status`, { status }),
  generate: (data) => api.post('/content/generate', data),
  getStats: () => api.get('/content/stats/overview'),
};

// Lead API
export const leadAPI = {
  create: (data) => api.post('/leads', data),
  getAll: (filters) => api.get('/leads', { params: filters }),
  getById: (id) => api.get(`/leads/${id}`),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
  updateStatus: (id, status) => api.patch(`/leads/${id}/status`, { status }),
  getStats: () => api.get('/leads/stats/overview'),
  getBySource: () => api.get('/leads/sources/breakdown'),
};

// Analytics API
export const analyticsAPI = {
  create: (data) => api.post('/analytics', data),
  getSummary: (days = 30) => api.get('/analytics/summary', { params: { days } }),
  getTraffic: (days = 30) => api.get('/analytics/traffic', { params: { days } }),
  getConversions: (days = 30) => api.get('/analytics/conversions', { params: { days } }),
  getRoi: (days = 30) => api.get('/analytics/roi', { params: { days } }),
  getSources: (days = 30) => api.get('/analytics/sources', { params: { days } }),
  getDevices: (days = 30) => api.get('/analytics/devices', { params: { days } }),
};

// SEO API
export const seoAPI = {
  analyze: (data) => api.post('/seo/analyze', data),
  getAnalyses: (filters) => api.get('/seo/analyses', { params: filters }),
  getByUrl: (url) => api.get(`/seo/analyze/${url}`),
  update: (id, data) => api.put(`/seo/analyses/${id}`, data),
  getKeywords: (keyword) => api.get('/seo/keywords', { params: { keyword } }),
  getMetaTitles: (keyword) => api.get('/seo/meta-titles', { params: { keyword } }),
  getMetaDescriptions: (keyword) => api.get('/seo/meta-descriptions', { params: { keyword } }),
};

export default api;
