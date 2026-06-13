/**
 * Lead Management Component
 */

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import { leadAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: 'Website',
  });
  const { success, error: showError } = useToast();

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadAPI.getAll(filters);
      setLeads(response.data || []);
    } catch (err) {
      showError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await leadAPI.update(editingId, formData);
        success('Lead updated successfully');
      } else {
        await leadAPI.create(formData);
        success('Lead created successfully');
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        source: 'Website',
      });
      setShowForm(false);
      setEditingId(null);
      fetchLeads();
    } catch (err) {
      showError('Failed to save lead');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await leadAPI.delete(id);
        setLeads(leads.filter(l => l._id !== id));
        success('Lead deleted');
      } catch (err) {
        showError('Failed to delete lead');
      }
    }
  };

  const handleEdit = (lead) => {
    setFormData(lead);
    setEditingId(lead._id);
    setShowForm(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Track and manage your leads</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <FiPlus className="inline mr-2" />
          New Lead
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search leads..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            icon={<FiSearch />}
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
          </select>
        </div>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Lead' : 'Add New Lead'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
              <Input
                label="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
                <option value="Email">Email</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save Lead</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    jobTitle: '',
                    source: 'Website',
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Leads List */}
      <div className="space-y-4">
        {leads.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-8">No leads found</p>
          </Card>
        ) : (
          leads.map((lead) => (
            <Card key={lead._id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">{lead.email}</p>
                  <p className="text-gray-500 text-sm">
                    {lead.company} {lead.jobTitle && `• ${lead.jobTitle}`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {lead.status}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(lead)}
                    >
                      <FiEdit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(lead._id)}
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

export default LeadManagement;
