/**
 * Content Routes
 */

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const contentController = require('../controllers/contentController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Content CRUD
router.post('/', contentController.createContent);
router.get('/', contentController.getContent);
router.get('/stats/overview', contentController.getStats);
router.get('/:id', contentController.getContentById);
router.put('/:id', contentController.updateContent);
router.delete('/:id', contentController.deleteContent);

// Content actions
router.patch('/:id/status', contentController.updateStatus);
router.post('/generate', contentController.generateContent);

module.exports = router;
