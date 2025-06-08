const db = require("../database/connectDB");

exports.getAllHoiThao = async () => {
    const rows = await db.query('SELECT * FROM hoithao');
    return rows;
};
exports.getHoiThaoById = async (maht) => {
    try {
        const rows = await db.query('SELECT * FROM hoithao WHERE maht = ?', [maht]);
        console.log('HoiThao by maht:', rows);
        
        // Kiểm tra nếu rows rỗng hoặc không phải mảng
        if (!Array.isArray(rows) || rows.length === 0) {
            return null; // Không tìm thấy hội thảo
        }
        
        return rows[0]; // Trả về hội thảo đầu tiên (vì maht là duy nhất)
    } catch (error) {
        console.error('Error querying hoithao by maht:', error);
        throw error; // Ném lỗi để controller xử lý
    }
};
exports.getHoithaobybtc = async (mabtc) => {
    try {
        const rows = await db.query('SELECT * FROM hoithao WHERE mabtc = ?', [mabtc]);
        console.log('HoiThao by mabtc:', rows);
        
        // Kiểm tra nếu rows rỗng hoặc không phải mảng
        if (!Array.isArray(rows) || rows.length === 0) {
            return null; // Không tìm thấy hội thảo
        }
        
        return rows; // Trả về tất cả hội thảo liên quan đến mabtc
    } catch (error) {
        console.error('Error querying hoithao by mabtc:', error);
        throw error; // Ném lỗi để controller xử lý
    }
}