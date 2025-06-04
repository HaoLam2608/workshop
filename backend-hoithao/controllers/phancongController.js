const phancongService = require('../services/phancongService');

exports.assignReviewers = async (req, res) => {
    try {
        const { mabaibao, reviewerIds, mapbtc } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!mabaibao || !reviewerIds || reviewerIds.length !== 2 || !mapbtc) {
            return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ. Cần mabaibao, mapbtc và danh sách 2 reviewerIds.' });
        }

        // Kiểm tra reviewerIds là số hợp lệ
        if (!reviewerIds.every(id => typeof id === 'number' && !isNaN(id))) {
            return res.status(400).json({ message: 'ReviewerIds phải là số hợp lệ.' });
        }

        const result = await phancongService.assignReviewers(mabaibao, reviewerIds, mapbtc);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error in assignReviewers:', err.message);
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};