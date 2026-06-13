/**
 * Analytics Service
 * Handles analytics data collection and reporting
 */

const Analytics = require('../models/Analytics');

class AnalyticsService {
  /**
   * Create analytics record
   * @param {string} userId
   * @param {Object} analyticsData
   * @returns {Object} Created analytics
   */
  static async createAnalytics(userId, analyticsData) {
    const analytics = await Analytics.create({
      userId,
      ...analyticsData,
    });

    return analytics;
  }

  /**
   * Get analytics for date range
   * @param {string} userId
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {string} campaignId (optional)
   * @returns {Array} Analytics records
   */
  static async getAnalyticsRange(userId, startDate, endDate, campaignId = null) {
    const query = {
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (campaignId) {
      query.campaignId = campaignId;
    }

    const analytics = await Analytics.find(query).sort({ date: 1 });
    return analytics;
  }

  /**
   * Get latest analytics
   * @param {string} userId
   * @param {number} days
   * @returns {Array} Recent analytics
   */
  static async getRecentAnalytics(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.getAnalyticsRange(userId, startDate, new Date());
  }

  /**
   * Get analytics summary
   * @param {string} userId
   * @param {number} days
   * @returns {Object} Summary stats
   */
  static async getAnalyticsSummary(userId, days = 30) {
    const analytics = await this.getRecentAnalytics(userId, days);

    if (analytics.length === 0) {
      return null;
    }

    const summary = {
      period: `Last ${days} days`,
      dateRange: {
        from: analytics[0].date,
        to: analytics[analytics.length - 1].date,
      },
      traffic: {
        totalVisitors: 0,
        totalPageViews: 0,
        totalSessions: 0,
        averageSessionDuration: 0,
        averageBounceRate: 0,
      },
      conversions: {
        total: 0,
        rate: 0,
        value: 0,
      },
      sources: {},
      devices: {
        desktop: 0,
        mobile: 0,
        tablet: 0,
      },
      roi: {
        totalRevenue: 0,
        totalCost: 0,
        percentage: 0,
      },
    };

    // Aggregate data
    analytics.forEach(record => {
      summary.traffic.totalVisitors += record.traffic?.visitors || 0;
      summary.traffic.totalPageViews += record.traffic?.pageViews || 0;
      summary.traffic.totalSessions += record.traffic?.sessions || 0;
      summary.conversions.total += record.conversions?.total || 0;
      summary.conversions.value += record.conversions?.value || 0;
      summary.roi.totalRevenue += record.roi?.revenue || 0;
      summary.roi.totalCost += record.roi?.cost || 0;

      // Devices
      summary.devices.desktop += record.devices?.desktop || 0;
      summary.devices.mobile += record.devices?.mobile || 0;
      summary.devices.tablet += record.devices?.tablet || 0;

      // Sources
      Object.keys(record.sources || {}).forEach(source => {
        summary.sources[source] = (summary.sources[source] || 0) + record.sources[source];
      });
    });

    // Calculate averages
    summary.traffic.averageSessionDuration = analytics.length > 0
      ? analytics.reduce((sum, r) => sum + (r.traffic?.sessionDuration || 0), 0) / analytics.length
      : 0;

    summary.traffic.averageBounceRate = analytics.length > 0
      ? analytics.reduce((sum, r) => sum + (r.traffic?.bounceRate || 0), 0) / analytics.length
      : 0;

    summary.conversions.rate = summary.traffic.totalPageViews > 0
      ? (summary.conversions.total / summary.traffic.totalPageViews) * 100
      : 0;

    summary.roi.percentage = summary.roi.totalCost > 0
      ? ((summary.roi.totalRevenue - summary.roi.totalCost) / summary.roi.totalCost) * 100
      : 0;

    return summary;
  }

  /**
   * Get traffic trends
   * @param {string} userId
   * @param {number} days
   * @returns {Array} Traffic data for chart
   */
  static async getTrafficTrends(userId, days = 30) {
    const analytics = await this.getRecentAnalytics(userId, days);

    return analytics.map(record => ({
      date: record.date.toISOString().split('T')[0],
      visitors: record.traffic?.visitors || 0,
      pageViews: record.traffic?.pageViews || 0,
      sessions: record.traffic?.sessions || 0,
      bounceRate: record.traffic?.bounceRate || 0,
    }));
  }

  /**
   * Get conversion trends
   * @param {string} userId
   * @param {number} days
   * @returns {Array} Conversion data for chart
   */
  static async getConversionTrends(userId, days = 30) {
    const analytics = await this.getRecentAnalytics(userId, days);

    return analytics.map(record => ({
      date: record.date.toISOString().split('T')[0],
      conversions: record.conversions?.total || 0,
      conversionRate: record.conversions?.rate || 0,
      value: record.conversions?.value || 0,
    }));
  }

  /**
   * Get ROI trends
   * @param {string} userId
   * @param {number} days
   * @returns {Array} ROI data for chart
   */
  static async getRoiTrends(userId, days = 30) {
    const analytics = await this.getRecentAnalytics(userId, days);

    return analytics.map(record => ({
      date: record.date.toISOString().split('T')[0],
      revenue: record.roi?.revenue || 0,
      cost: record.roi?.cost || 0,
      roi: record.roi?.percentage || 0,
    }));
  }

  /**
   * Get source breakdown
   * @param {string} userId
   * @param {number} days
   * @returns {Object} Traffic by source
   */
  static async getSourceBreakdown(userId, days = 30) {
    const summary = await this.getAnalyticsSummary(userId, days);
    return summary?.sources || {};
  }

  /**
   * Get device breakdown
   * @param {string} userId
   * @param {number} days
   * @returns {Object} Traffic by device
   */
  static async getDeviceBreakdown(userId, days = 30) {
    const summary = await this.getAnalyticsSummary(userId, days);
    return summary?.devices || {};
  }
}

module.exports = AnalyticsService;
