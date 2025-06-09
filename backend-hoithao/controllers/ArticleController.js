
const ArticleService = require("../services/ArticleService.js");
exports.submitArticle = async(req , res) => {
    try {
        const res = await ArticleService.insertArticle(req.body);
        if(!res.data.error){
            return res.status(200).json("Nộp bài báo thành công");
        }
            return res.status(200).json("Nộp bài báo thất bại");

    } catch (error) {
        return res.status(200).json("Có lỗi xảy ra", error.message  );
    }
};

exports.AllSubmitedPaper = async(req,res) => {
    const authorId = req.params.id;
    try {
        const papers = await ArticleService.GetAllPapers(authorId);
         if(papers.data.papers){
            return res.status(200).json({message : "Lấy danh sách thành công" , papers : papers.data.papers});

        }
            return res.status(200).json("Lấy danh sách thành công thất bại");
    } catch (error) {
        return res.status(200).json("Có lỗi xảy ra", error.message  );
    }
}

exports.getStateOfPaper = async (req, res) => {
  try {
    const papers = await ArticleService.getAuthorPapers(req.params.authorId);
    console.log(papers);
    return res.json({ data: papers });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch papers" });
  }
}