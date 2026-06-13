/**
 * Campaign List Page
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { campaignAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', type: '' });
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, [filters]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignAPI.getAll(filters);
      setCampaigns(response.data || []);
    } catch (err) {
      showError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await campaignAPI.delete(id);
        setCampaigns(campaigns.filter(c => c._id !== id));
        success('Campaign deleted successfully');
      } catch (err) {
        showError('Failed to delete campaign');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Planning': 'bg-gray-100 text-gray-800',
      'Active': 'bg-green-100 text-green-800',
      'Paused': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Archived': 'bg-gray-200 text-gray-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Manage and track your marketing campaigns</p>
        </div>
        <Link to="/campaigns/new">
          <Button>
            <FiPlus className="inline mr-2" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Status</option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="Social Media">Social Media</option>
              <option value="Email">Email</option>
              <option value="Content Marketing">Content Marketing</option>
              <option value="SEO">SEO</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-8">No campaigns found. Create your first campaign!</p>
          </Card>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign._id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{campaign.description}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>Type: <strong>{campaign.type}</strong></span>
                    <span>Budget: <strong>${campaign.budget}</strong></span>
                    <span>ROI: <strong>{(campaign.metrics?.roi || 0).toFixed(1)}%</strong></span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <div className="flex gap-2">
                    <Link to={`/campaigns/${campaign._id}`}>
                      <Button variant="secondary" size="sm">
                        <FiEye size={16} />
                      </Button>
                    </Link>
                    <Link to={`/campaigns/${campaign._id}/edit`}>
                      <Button variant="secondary" size="sm">
                        <FiEdit2 size={16} />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(campaign._id)}
                    >
                      <FiTrash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignList;
