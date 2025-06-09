const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/ArticleController");
router.post("/addPaper" ,ArticleController.submitArticle);
router.get("/FetchAllByAuthor/:id" , ArticleController.AllSubmitedPaper)
router.get("/author/:authorId", ArticleController.getStateOfPaper);
module.exports = router;