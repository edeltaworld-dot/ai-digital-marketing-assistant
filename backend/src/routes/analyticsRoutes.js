/**
 * Analytics Routes
 */

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Analytics endpoints
router.post('/', analyticsController.createAnalytics);
router.get('/summary', analyticsController.getSummary);
router.get('/traffic', analyticsController.getTrafficTrends);
router.get('/conversions', analyticsController.getConversionTrends);
router.get('/roi', analyticsController.getRoiTrends);
router.get('/sources', analyticsController.getSourceBreakdown);
router.get('/devices', analyticsController.getDeviceBreakdown);

module.exports = router;
