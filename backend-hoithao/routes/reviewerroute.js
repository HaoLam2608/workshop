// routes/reviewer.route.js
const express = require("express");
const router = express.Router();
const reviewerController = require("../controllers/reviewercontroller");

router.get("/assigned/:reviewerId", reviewerController.getAssignedPapers);

module.exports = router;
