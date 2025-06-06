// controllers/reviewer.controller.js
const reviewerService = require("../services/reviewerservice");

exports.getAssignedPapers = async (req, res) => {
    try {
        const reviewerId = parseInt(req.params.reviewerId);
        const papers = await reviewerService.getAssignedPapers(reviewerId);
        res.status(200).json({ data: papers });
    } catch (error) {
        console.error("Lỗi khi lấy bài báo:", error);
        res.status(500).json({ message: "Không thể lấy danh sách bài báo", error: error.message });
    }
};
