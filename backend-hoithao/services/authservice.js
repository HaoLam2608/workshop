// services/user.service.js
const db = require("../database/connectDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
    const {
        email,
        hoten,
        diachi,
        role = "author",
        coquan,
        linhvu,
        hocvi,
        username,
        password
    } = userData;

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
        throw new Error("Tên đăng nhập đã tồn tại");
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user vào DB
    const result = await db.query(
        `INSERT INTO users (email, hoten, diachi, role, coquan, linhvu, hocvi, username, password)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, hoten, diachi, role, coquan, linhvu, hocvi, username, hashedPassword]
    );

    return { id: result.insertId, username, email, hoten, role };
};
exports.login = async ({ username, password }) => {
    const users = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length === 0) {
        throw new Error("Tên đăng nhập không tồn tại");
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Sai mật khẩu");
    }

    // Tạo JWT Token
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            hoten: user.hoten,
            email: user.email,
            role: user.role
        }
    };
};

exports.loginBTC= async ({ username, password }) => {
     const rows = await db.query(
        'SELECT * FROM bantochuc WHERE usernamebtc = ? AND passwordbtc = ?',
        [username, password]
      );
      console.log(rows);
      if (rows.length === 0) {
        throw new Error('Username hoặc password không đúng');
      }

      const user = rows[0];
      return {
        id: user.mabtc,
        hoten: user.tenbtc,
        username: user.usernamebtc
      };
}
