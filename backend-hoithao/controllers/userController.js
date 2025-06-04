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