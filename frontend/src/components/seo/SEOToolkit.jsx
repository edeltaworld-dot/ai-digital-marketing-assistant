/**
 * SEO Toolkit Component
 */

import React, { useState } from 'react';
import { FiSearch, FiCopy } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import { seoAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const SEOToolkit = () => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error: showError } = useToast();

  const tabs = [
    { id: 'keywords', label: 'Keyword Research' },
    { id: 'titles', label: 'Meta Titles' },
    { id: 'descriptions', label: 'Meta Descriptions' },
  ];

  const handleSearch = async () => {
    if (!keyword.trim()) {
      showError('Please enter a keyword');
      return;
    }

    try {
      setLoading(true);
      let response;

      if (activeTab === 'keywords') {
        response = await seoAPI.getKeywords(keyword);
      } else if (activeTab === 'titles') {
        response = await seoAPI.getMetaTitles(keyword);
      } else {
        response = await seoAPI.getMetaDescriptions(keyword);
      }

      setResults(response.data || []);
    } catch (err) {
      showError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    success('Copied to clipboard!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Toolkit</h1>
        <p className="text-gray-600">Optimize your content for search engines</p>
      </div>

      {/* Search */}
      <Card>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter keyword or topic..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              loading={loading}
              className="px-6"
            >
              <FiSearch className="inline mr-2" />
              Search
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResults([]);
                }}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          </Card>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <Card key={index}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">
                    {typeof result === 'string' ? result : result.keyword || result}
                  </p>
                  {result.traffic && (
                    <p className="text-sm text-gray-600 mt-1">
                      Traffic: {result.traffic}
                    </p>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(typeof result === 'string' ? result : result.keyword || result)}
                >
                  <FiCopy size={16} />
                </Button>
              </div>
            </Card>
          ))
        ) : keyword && !loading ? (
          <Card>
            <p className="text-center text-gray-500 py-8">No results found. Try a different keyword.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default SEOToolkit;
