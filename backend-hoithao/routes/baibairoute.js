const express = require('express');
const router = express.Router();
const baibaoController = require('../controllers/baibaocontroller');

// Route để lấy thông tin bài báo cùng tác giả
router.get('/:mabaibao', baibaoController.getBaibaoWithTacgia);
router.get('/hoithao/:maht', baibaoController.getBaibaoByHoiThao);
module.exports = router;