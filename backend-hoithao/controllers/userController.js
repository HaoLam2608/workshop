const userService = require('../services/userService');

exports.getAvailableReviewers = async (req, res) => {
    try {
        const reviewers = await userService.getAvailableReviewers();
        res.status(200).json(reviewers);
    } catch (err) {
        console.error('Error fetching available reviewers:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getAuthorById = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await userService.getAuthorById(id);
        res.status(200).json(author);
    } catch (error) {
        res.status(404).json({ error: error.message || 'Không tìm thấy tác giả' });
    }
};