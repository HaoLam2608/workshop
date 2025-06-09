const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json()); 

// Import routes
const authRoute = require("./routes/authroute");
const hoithaoRoute = require("./routes/hoithaoroute");
const baibaoRoute = require("./routes/baibairoute");
const userRoute = require("./routes/userRoute");
const phancongRoute = require("./routes/phancongRoute");
const reviewerRoutes = require("./routes/reviewerroute");
const reviewRoutes = require('./routes/reviewroutes');
const ArticleRoute = require("./routes/ArticleRoute");

app.use("/api/auth", authRoute);
app.use("/api/hoithao", hoithaoRoute);
app.use("/api/baibao", baibaoRoute);
app.use("/api/user", userRoute);
app.use("/api/phancong", phancongRoute);
app.use("/api/reviewer", reviewerRoutes); 
app.use('/api/reviews', reviewRoutes);
app.use("/api/article" , ArticleRoute);
module.exports = app;
