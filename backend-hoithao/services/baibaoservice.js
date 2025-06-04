const db = require('../database/connectDB'); // Giả sử bạn có file config/db để kết nối database

exports.getBaibaoWithTacgia = async (mabaibao) => {
    try {
        const rows = await db.query(`
            SELECT b.*, u.id AS tacgia_id, u.hoten, u.email, t.vai_tro
            FROM baibao b
            LEFT JOIN thamgia t ON b.mabaibao = t.id_baibao
            LEFT JOIN users u ON t.id_tacgia = u.id
            WHERE b.mabaibao = ?;
        `, [mabaibao]);

        console.log('Rows from db.query:', rows);

        // Kiểm tra kỹ hơn: đảm bảo rows là mảng và có dữ liệu
        if (!Array.isArray(rows) || rows.length === 0 || !rows[0]) {
            console.warn('No valid data found for mabaibao:', mabaibao);
            return null;
        }

        // Nhóm dữ liệu: một bài báo có thể có nhiều tác giả
        const baibao = {
            mabaibao: rows[0].mabaibao,
            tenbaibao: rows[0].tenbaibao,
            linhvuc: rows[0].linhvuc,
            tomtat: rows[0].tomtat,
            tacgia: rows.map(row => ({
                id: row.tacgia_id,
                hoten: row.hoten,
                email: row.email,
                vai_tro: row.vai_tro
            })).filter(tacgia => tacgia.id !== null) // Loại bỏ các row không có tác giả
        };

        return baibao;
    } catch (error) {
        console.error('Error querying baibao with tacgia:', error);
        throw error;
    }
};

exports.getBaibaoByHoiThao = async (maht) => {
    try {
        const rows = await db.query(`
            SELECT b.*, u.id AS tacgia_id, u.hoten, u.email, t.vai_tro
            FROM hoithao_baibao hb
            JOIN baibao b ON hb.mabaibao = b.mabaibao
            LEFT JOIN thamgia t ON b.mabaibao = t.id_baibao
            LEFT JOIN users u ON t.id_tacgia = u.id
            WHERE hb.maht = ?;
        `, [maht]);

        console.log('Rows from db.query for hoithao:', rows);

        const rowsArray = Array.isArray(rows) ? rows : rows ? [rows] : [];

        if (rowsArray.length === 0) {
            console.warn('No articles found for maht:', maht);
            return [];
        }

        const baibaoMap = new Map();
        rowsArray.forEach(row => {
            const mabaibao = row.mabaibao;
            if (!baibaoMap.has(mabaibao)) {
                baibaoMap.set(mabaibao, {
                    mabaibao: row.mabaibao,
                    tenbaibao: row.tenbaibao,
                    linhvuc: row.linhvuc,
                    tomtat: row.tomtat,
                    status: row.status,
                    tacgia: []
                });
            }
            if (row.tacgia_id) {
                baibaoMap.get(mabaibao).tacgia.push({
                    id: row.tacgia_id,
                    hoten: row.hoten,
                    email: row.email,
                    vai_tro: row.vai_tro
                });
            }
        });

        return Array.from(baibaoMap.values());
    } catch (error) {
        console.error('Error querying baibao by hoithao:', error);
        throw error;
    }
};