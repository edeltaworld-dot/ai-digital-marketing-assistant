/**
 * Dashboard Page
 * Main dashboard with overview cards and charts
 */

import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiFileText, FiUsers, FiBarChart2 } from 'react-icons/fi';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import { campaignAPI, contentAPI, leadAPI, analyticsAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    campaigns: 0,
    content: 0,
    leads: 0,
    analytics: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [campaigns, content, leads, analytics] = await Promise.all([
        campaignAPI.getStats(),
        contentAPI.getStats(),
        leadAPI.getStats(),
        analyticsAPI.getSummary(),
      ]);

      setStats({
        campaigns: campaigns.data,
        content: content.data,
        leads: leads.data,
        analytics: analytics.data,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const overviewCards = [
    {
      title: 'Total Campaigns',
      value: stats.campaigns?.totalCampaigns || 0,
      icon: FiBriefcase,
      color: 'bg-blue-100 text-blue-600',
      trend: `${stats.campaigns?.activeCampaigns || 0} active`,
    },
    {
      title: 'Content Created',
      value: stats.content?.totalContent || 0,
      icon: FiFileText,
      color: 'bg-green-100 text-green-600',
      trend: `${stats.content?.publishedContent || 0} published`,
    },
    {
      title: 'Total Leads',
      value: stats.leads?.totalLeads || 0,
      icon: FiUsers,
      color: 'bg-purple-100 text-purple-600',
      trend: `${stats.leads?.qualifiedLeads || 0} qualified`,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.analytics?.roi?.totalRevenue || 0}`,
      icon: FiBarChart2,
      color: 'bg-orange-100 text-orange-600',
      trend: `ROI: ${(stats.analytics?.roi?.percentage || 0).toFixed(1)}%`,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your marketing overview.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{card.trend}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Budget</span>
              <span className="font-semibold">${stats.campaigns?.totalBudget || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Spent</span>
              <span className="font-semibold">${stats.campaigns?.totalSpent || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average ROI</span>
              <span className="font-semibold text-green-600">{(stats.campaigns?.averageROI || 0).toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Conversion</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold">{(stats.leads?.conversionRate || 0).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Lead Value</span>
              <span className="font-semibold">${stats.leads?.totalLeadValue || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Value</span>
              <span className="font-semibold">${(stats.leads?.averageLeadValue || 0).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
