const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json()); 

// Import routes
const authRoute = require("./routes/authroute");
app.use("/api/auth", authRoute);
module.exports = app;
