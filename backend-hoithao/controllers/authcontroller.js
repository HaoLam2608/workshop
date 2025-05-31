// controllers/user.controller.js
const userService = require("../services/authservice");

exports.registerUser = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({ message: "Đăng ký thành công", data: result });
    } catch (error) {
        res.status(400).json({ message: "Đăng ký thất bại", error: error.message });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({ message: "Đăng nhập thành công", data: result });
    } catch (error) {
        res.status(401).json({ message: "Đăng nhập thất bại", error: error.message });
    }
};
