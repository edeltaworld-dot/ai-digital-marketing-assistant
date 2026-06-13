/**
 * SEO Routes
 */

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const seoController = require('../controllers/seoController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// SEO analysis
router.post('/analyze', seoController.createAnalysis);
router.get('/analyses', seoController.getAnalyses);
router.get('/analyze/:url', seoController.getAnalysisByUrl);
router.put('/analyses/:id', seoController.updateAnalysis);

// SEO tools
router.get('/keywords', seoController.getKeywordSuggestions);
router.get('/meta-titles', seoController.getMetaTitleSuggestions);
router.get('/meta-descriptions', seoController.getMetaDescriptionSuggestions);

module.exports = router;
