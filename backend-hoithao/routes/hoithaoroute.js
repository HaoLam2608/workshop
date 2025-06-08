const express = require('express');
const router = express.Router();
const hoithaoController = require('../controllers/hoithaocontroller');

router.get('/getall', hoithaoController.getAllHoiThao);
router.get('/:maht', hoithaoController.getHoiThaoById);
router.get('/btc/:mabtc', hoithaoController.getHoithaobybtc);
module.exports = router;
