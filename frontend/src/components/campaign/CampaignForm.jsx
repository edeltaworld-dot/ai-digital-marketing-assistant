/**
 * Campaign Create/Edit Page
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import { campaignAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Social Media',
    goal: '',
    budget: '',
    startDate: '',
    endDate: '',
    channels: [],
  });

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const response = await campaignAPI.getById(id);
      const campaign = response.data;
      setFormData({
        name: campaign.name,
        description: campaign.description,
        type: campaign.type,
        goal: campaign.goal,
        budget: campaign.budget,
        startDate: new Date(campaign.startDate).toISOString().split('T')[0],
        endDate: new Date(campaign.endDate).toISOString().split('T')[0],
        channels: campaign.channels || [],
      });
    } catch (err) {
      showError('Failed to load campaign');
      navigate('/campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type: inputType } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === 'number' ? Number(value) : value,
    });
  };

  const handleChannelToggle = (channel) => {
    setFormData({
      ...formData,
      channels: formData.channels.includes(channel)
        ? formData.channels.filter(c => c !== channel)
        : [...formData.channels, channel],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (id) {
        await campaignAPI.update(id, formData);
        success('Campaign updated successfully');
      } else {
        await campaignAPI.create(formData);
        success('Campaign created successfully');
      }
      navigate('/campaigns');
    } catch (err) {
      showError('Failed to save campaign');
    } finally {
      setSubmitting(false);
    }
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit Campaign' : 'Create New Campaign'}
        </h1>
        <p className="text-gray-600">
          {id ? 'Update campaign details' : 'Set up your marketing campaign'}
        </p>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <Input
                label="Campaign Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option>Social Media</option>
                    <option>Email</option>
                    <option>Content Marketing</option>
                    <option>SEO</option>
                    <option>PPC</option>
                  </select>
                </div>
                <Input
                  label="Goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget & Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Budget ($)"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                required
              />
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Channels</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'Email', 'Blog'].map((channel) => (
                <label key={channel} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(channel)}
                    onChange={() => handleChannelToggle(channel)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" loading={submitting}>
              {id ? 'Update Campaign' : 'Create Campaign'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/campaigns')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CampaignForm;
