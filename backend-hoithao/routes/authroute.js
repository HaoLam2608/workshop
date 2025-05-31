// routes/user.route.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/authcontroller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser); // <-- Thêm dòng này

module.exports = router;
