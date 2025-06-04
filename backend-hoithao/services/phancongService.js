const db = require('../database/connectDB');

exports.assignReviewers = async (mabaibao, reviewerIds, mapbtc) => {
    try {
        // Kiểm tra bài báo tồn tại
        const article = await db.query('SELECT * FROM baibao WHERE mabaibao = ?', [mabaibao]);
        if (!article || article.length === 0) {
            throw new Error('Bài báo không tồn tại');
        }

        // Kiểm tra ban tổ chức tồn tại (dựa trên hoithao.mabtc)
        const btc = await db.query('SELECT * FROM hoithao WHERE mabtc = ?', [mapbtc]);
        if (!btc || btc.length === 0) {
            throw new Error('Ban tổ chức không tồn tại');
        }

        // Kiểm tra 2 phản biện tồn tại và có role = 'reviewer'
        const reviewers = await db.query(
            'SELECT id FROM users WHERE id IN (?, ?) AND role = "reviewer"',
            [reviewerIds[0], reviewerIds[1]]
        );
        if (reviewers.length !== 2) {
            throw new Error('Danh sách phản biện không hợp lệ');
        }

        // Kiểm tra tổng số phản biện đã được phân công cho bài báo
        const currentAssignments = await db.query(
            'SELECT COUNT(*) as count FROM phancong_phanbien WHERE mabaibao = ?',
            [mabaibao]
        );
        const totalReviewers = currentAssignments[0].count;
        if (totalReviewers >= 2) {
            throw new Error('Bài báo đã được phân công đủ 2 phản biện');
        }

        // Kiểm tra xem 2 phản biện mới có bị trùng với phân công hiện tại không
        const existingAssignments = await db.query(
            'SELECT * FROM phancong_phanbien WHERE mabaibao = ? AND id_user IN (?, ?)',
            [mabaibao, reviewerIds[0], reviewerIds[1]]
        );
        if (existingAssignments.length > 0) {
            throw new Error('Một hoặc cả hai phản biện đã được phân công cho bài báo này');
        }

        // Thêm 2 bản ghi phân công vào bảng phancong_phanbien
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await db.query(
            'INSERT INTO phancong_phanbien (mabaibao, id_user, mapbtc, ngayphancong, trangthai) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
            [
                mabaibao, reviewerIds[0], mapbtc, currentTime, 'dang_phanbien',
                mabaibao, reviewerIds[1], mapbtc, currentTime, 'dang_phanbien'
            ]
        );

        // Cập nhật status của bài báo thành 'da_phan_cong'
        await db.query(
            'UPDATE baibao SET status = ? WHERE mabaibao = ?',
            ['da_phan_cong', mabaibao]
        );

        return { message: 'Phân công phản biện thành công' };
    } catch (error) {
        console.error('Error assigning reviewers:', error);
        throw error;
    }
};