const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route để lấy danh sách reviewer có số bài báo phản biện <= 4
router.get('/reviewers/available', userController.getAvailableReviewers);

module.exports = router;