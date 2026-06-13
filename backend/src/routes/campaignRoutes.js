/**
 * Campaign Routes
 */

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const campaignController = require('../controllers/campaignController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Campaign CRUD
router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);
router.get('/stats/overview', campaignController.getStats);
router.get('/:id', campaignController.getCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);

// Campaign actions
router.patch('/:id/status', campaignController.updateStatus);
router.patch('/:id/metrics', campaignController.updateMetrics);

module.exports = router;
