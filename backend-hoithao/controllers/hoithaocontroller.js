const hoithaoService = require('../services/hoithaoservice');

exports.getAllHoiThao = async (req, res) => {
    try {
        const data = await hoithaoService.getAllHoiThao();
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching hoithao:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getHoiThaoById = async (req, res) => {
    try {
        const maht = req.params.maht;
        
        // Kiểm tra maht có phải số hợp lệ không
        if (!maht || isNaN(maht)) {
            return res.status(400).json({ message: 'Mã hội thảo không hợp lệ' });
        }

        const hoiThao = await hoithaoService.getHoiThaoById(maht);
        
        if (!hoiThao) {
            return res.status(404).json({ message: 'Không tìm thấy hội thảo' });
        }

        res.status(200).json(hoiThao);
    } catch (err) {
        console.error('Error fetching hoithao by maht:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};