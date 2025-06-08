const baibaoService = require('../services/baibaoservice');

exports.getBaibaoWithTacgia = async (req, res) => {
    try {
        const mabaibao = req.params.mabaibao;

        // Kiểm tra mabaibao có phải số hợp lệ không
        if (!mabaibao || isNaN(mabaibao)) {
            return res.status(400).json({ message: 'Mã bài báo không hợp lệ' });
        }

        const baibao = await baibaoService.getBaibaoWithTacgia(mabaibao);

        if (!baibao) {
            return res.status(404).json({ message: 'Không tìm thấy bài báo' });
        }

        res.status(200).json(baibao);
    } catch (err) {
        console.error('Error fetching baibao with tacgia:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getBaibaoByHoiThao = async (req, res) => {
    try {
        const maht = req.params.maht;

        if (!maht || isNaN(maht)) {
            return res.status(400).json({ message: 'Mã hội thảo không hợp lệ' });
        }

        const baibaoList = await baibaoService.getBaibaoByHoiThao(maht);

        res.status(200).json(baibaoList);
    } catch (err) {
        console.error('Error fetching baibao by hoithao:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getPNXbaibao = async (req, res) => {
    try {
        const mabaibao = req.params.mabaibao;

        // Kiểm tra mabaibao có phải số hợp lệ không
        if (!mabaibao || isNaN(mabaibao)) {
            return res.status(400).json({ message: 'Mã bài báo không hợp lệ' });
        }

        const pnx = await baibaoService.getPNXByMaBaibao(mabaibao);

        if (!pnx) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin phản biện' });
        }

        res.status(200).json(pnx);
    } catch (err) {
        console.error('Error fetching PNX for baibao:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}