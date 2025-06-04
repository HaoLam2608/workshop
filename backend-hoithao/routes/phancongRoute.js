const express = require('express');
const router = express.Router();
const phancongController = require('../controllers/phancongController');

// Route để phân công phản biện
router.post('/assign', phancongController.assignReviewers);

module.exports = router;