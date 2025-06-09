const reviewService = require("../services/reviewservice");

exports.checkReviewStatus = async (req, res) => {
  try {
    const { reviewerId, paperId } = req.body;
    if (!reviewerId || !paperId) {
      return res.status(400).json({ message: 'Thiếu reviewerId hoặc paperId' });
    }

    const result = await reviewService.checkReviewStatus(reviewerId, paperId);
    res.status(200).json({ hasReviewed: result.hasReviewed });
  } catch (error) {
    console.error('Lỗi khi kiểm tra trạng thái:', error);
    res.status(500).json({ error: 'Lỗi server khi kiểm tra trạng thái đánh giá' });
  }
};
exports.submitReview = async (req, res) => {
  try {
    const { reviewerId, paperId, ...review } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !reviewerId || !paperId ||
      !review.scientificValue ||
      !review.novelty ||
      !review.researchResults ||
      !review.conclusion ||
      !review.finalDecision
    ) {
      return res.status(400).json({ error: 'Thiếu dữ liệu đánh giá bắt buộc.' });
    }

    // Gọi service để xử lý
    const result = await reviewService.createReview(reviewerId, paperId, review);

    // Trả về kết quả thành công
    return res.status(201).json({
      message: 'Tạo phiếu nhận xét thành công',
      maphieuncx: result.maphieuncx
    });

  } catch (error) {
    console.error('Lỗi khi tạo phiếu nhận xét:', error.message);
    return res.status(400).json({ error: error.message });
  }
};
