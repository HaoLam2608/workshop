const reviewService = require("../services/reviewservice");

exports.submitReview = async (req, res) => {
    const { reviewerId, paperId, ...review } = req.body;

    // Kiểm tra đầu vào
    if (!reviewerId || !paperId || !review.finalDecision) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }

    try {
        const result = await reviewService.createReview(reviewerId, paperId, review);
        res.status(201).json({ message: 'Tạo phiếu nhận xét thành công', maphieuncx: result.maphieuncx });
    } catch (error) {
        console.error('Lỗi khi tạo phiếu nhận xét:', error);
        res.status(500).json({ error: 'Lỗi server khi tạo phiếu nhận xét' });
    }
};
