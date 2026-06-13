/**
 * Lead Routes
 */

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const leadController = require('../controllers/leadController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Lead CRUD
router.post('/', leadController.createLead);
router.get('/', leadController.getLeads);
router.get('/stats/overview', leadController.getStats);
router.get('/sources/breakdown', leadController.getLeadsBySource);
router.get('/:id', leadController.getLeadById);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

// Lead actions
router.patch('/:id/status', leadController.updateStatus);

module.exports = router;
