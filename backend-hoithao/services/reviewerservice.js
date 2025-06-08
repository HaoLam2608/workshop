const db = require("../database/connectDB");  // <-- Thêm dòng này

exports.getAssignedPapers = async (reviewerId) => {
    const sql = `
        SELECT 
            bb.mabaibao AS id,
            bb.tenbaibao AS title,
            bb.linhvuc AS field,
            bb.danhgia AS danhgia,
            pc.ngayphancong AS deadline,
            pc.trangthai AS status,
            GROUP_CONCAT(u.hoten SEPARATOR ', ') AS authors
        FROM phancong_phanbien pc
        JOIN baibao bb ON pc.mabaibao = bb.mabaibao
        LEFT JOIN thamgia tg ON bb.mabaibao = tg.id_baibao
        LEFT JOIN users u ON tg.id_tacgia = u.id
        WHERE pc.id_user = ?
        GROUP BY bb.mabaibao, bb.tenbaibao, bb.linhvuc, bb.danhgia, pc.ngayphancong, pc.trangthai
    `;

    try {
        const results = await db.query(sql, [reviewerId]);

        console.log('Results from db.query:', results);

        const rows = Array.isArray(results) && Array.isArray(results[0]) ? results[0] : results;

        if (!Array.isArray(rows)) {
            console.warn('Rows is not an array:', rows);
            return [];
        }

        return rows.map(paper => ({
            ...paper,
            reviewForm: {
                scientificValue: '',
                novelty: '',
                researchResults: '',
                conclusion: '',
                finalDecision: ''
            }
        }));
    } catch (error) {
        console.error('Error in getAssignedPapers:', error);
        throw error;
    }
};
