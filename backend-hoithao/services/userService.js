const db = require('../database/connectDB');

exports.getAvailableReviewers = async () => {
    try {
        const rows = await db.query(`
            SELECT u.id, u.email, u.hoten, u.diachi, u.coquan, u.linhvuc, u.hocvi, u.username,
                   COUNT(p.maphancong) AS assignedPapers
            FROM users u
            LEFT JOIN phancong_phanbien p ON u.id = p.id_user
            WHERE u.role = 'reviewer'
            GROUP BY u.id, u.email, u.hoten, u.diachi, u.coquan, u.linhvuc, u.hocvi, u.username
            HAVING assignedPapers <= 4;
        `);

        console.log('Rows from db.query:', rows);

        return rows;
    } catch (error) {
        console.error('Error querying available reviewers:', error);
        throw error;
    }
};

exports.getAuthorById = async (id) => {
    try {
        const rows = await db.query(
            `SELECT id, email, hoten, diachi, coquan, linhvuc, hocvi, username, role
             FROM users
             WHERE id = ? AND role = 'author'`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error('Không tìm thấy tác giả với ID đã cho');
        }

        return rows[0];
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tác giả theo ID:', error);
        throw error;
    }
};
