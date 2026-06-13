/**
 * Content Generator Component
 * AI-powered content generation for various platforms
 */

import React, { useState } from 'react';
import { FiCopy, FiDownload, FiSave } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import { contentAPI } from '../../services/api';
import useToast from '../../hooks/useToast';

const ContentGenerator = () => {
  const [contentType, setContentType] = useState('Social Media Post');
  const [platform, setPlatform] = useState('LinkedIn');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { success, error: showError } = useToast();

  const contentTypes = [
    'Social Media Post',
    'Blog Post',
    'Email',
    'Product Description',
    'Meta Description',
  ];

  const platforms = ['LinkedIn', 'Instagram', 'Facebook', 'Twitter', 'Blog', 'Email'];
  const tones = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Urgent'];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      showError('Please enter a topic');
      return;
    }

    try {
      setLoading(true);
      const response = await contentAPI.generate({
        type: contentType,
        platform,
        topic,
        tone,
      });
      setGeneratedContent(response.data?.content || '');
      success('Content generated successfully!');
    } catch (err) {
      showError('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent.trim()) {
      showError('No content to save');
      return;
    }

    try {
      setSaving(true);
      await contentAPI.create({
        title: `${contentType} - ${topic}`,
        type: contentType,
        platform,
        content: generatedContent,
        tone,
      });
      success('Content saved successfully!');
      setGeneratedContent('');
      setTopic('');
    } catch (err) {
      showError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    success('Content copied to clipboard!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Content Generator</h1>
        <p className="text-gray-600">Create engaging content for all your marketing channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Topic/Subject"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What would you like to write about?"
            />

            <Button
              onClick={handleGenerate}
              loading={loading}
              className="w-full"
              disabled={!topic.trim()}
            >
              Generate Content
            </Button>
          </div>
        </Card>

        {/* Generated Content */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 min-h-64 max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{generatedContent}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  <FiCopy className="inline mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={handleSave}
                  loading={saving}
                  className="flex-1"
                >
                  <FiSave className="inline mr-2" />
                  Save Content
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              {loading ? (
                <div className="space-y-4">
                  <Spinner size="lg" />
                  <p className="text-gray-600">Generating content...</p>
                </div>
              ) : (
                <p className="text-gray-500">Your generated content will appear here</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ContentGenerator;
