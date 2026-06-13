/**
 * Analytics Dashboard Component
 */

import React, { useState, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import { analyticsAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const AnalyticsDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const { error: showError } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getSummary(days);
      setSummary(response.data);
    } catch (err) {
      showError('Failed to load analytics');
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

  if (!summary) {
    return (
      <div className="p-6">
        <Card>
          <p className="text-center text-gray-500 py-8">No analytics data available</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your marketing performance</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Traffic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div>
            <p className="text-gray-600 text-sm">Total Visitors</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {summary.traffic?.totalVisitors?.toLocaleString() || 0}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-600 text-sm">Page Views</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {summary.traffic?.totalPageViews?.toLocaleString() || 0}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-600 text-sm">Bounce Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {summary.traffic?.averageBounceRate?.toFixed(1) || 0}%
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-600 text-sm">Avg. Session Duration</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {Math.round(summary.traffic?.averageSessionDuration || 0)}s
            </p>
          </div>
        </Card>
      </div>

      {/* Conversion Metrics */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Total Conversions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {summary.conversions?.total || 0}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {summary.conversions?.rate?.toFixed(2) || 0}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Conversion Value</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${summary.conversions?.value || 0}
            </p>
          </div>
        </div>
      </Card>

      {/* ROI */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-green-600" />
          Return on Investment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${summary.roi?.totalRevenue || 0}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Cost</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${summary.roi?.totalCost || 0}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">ROI</p>
            <p className={`text-2xl font-bold mt-1 ${
              (summary.roi?.percentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(summary.roi?.percentage || 0).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic by Source</h3>
          <div className="space-y-3">
            {Object.entries(summary.sources || {}).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{source}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (count / (summary.traffic?.totalVisitors || 1)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic by Device</h3>
          <div className="space-y-3">
            {Object.entries(summary.devices || {}).map(([device, count]) => (
              <div key={device} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{device}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (count / (summary.traffic?.totalVisitors || 1)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
