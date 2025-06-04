const db = require('../database/connectDB');

exports.getAvailableReviewers = async () => {
    try {
        const rows = await db.query(`
            SELECT u.id, u.email, u.hoten, u.diachi, u.coquan, u.linhvu, u.hocvi, u.username,
                   COUNT(p.maphancong) AS assignedPapers
            FROM users u
            LEFT JOIN phancong_phanbien p ON u.id = p.id_user
            WHERE u.role = 'reviewer'
            GROUP BY u.id, u.email, u.hoten, u.diachi, u.coquan, u.linhvu, u.hocvi, u.username
            HAVING assignedPapers <= 4;
        `);

        console.log('Rows from db.query:', rows);

        return rows;
    } catch (error) {
        console.error('Error querying available reviewers:', error);
        throw error;
    }
};