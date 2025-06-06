const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewcontroller');

router.post('/', reviewController.submitReview);

module.exports = router;