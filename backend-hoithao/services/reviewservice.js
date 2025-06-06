const db = require("../database/connectDB");

// Hàm trợ giúp: chạy truy vấn và đảm bảo trả về đúng danh sách rows
const getRows = async (query, params) => {
  const result = await db.query(query, params);
  if (Array.isArray(result)) {
    return result[0]; // kiểu mysql2/promise
  } else if (result && result.rows) {
    return result.rows; // kiểu MySQL Pool custom
  } else {
    throw new Error("Không thể phân tích kết quả từ db.query");
  }
};

exports.createReview = async (reviewerId, paperId, review) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (
      !review.scientificValue ||
      !review.novelty ||
      !review.researchResults ||
      !review.conclusion ||
      !review.finalDecision
    ) {
      throw new Error("Thiếu các trường bắt buộc trong review");
    }

    // Ép kiểu reviewerId và paperId thành số
    const reviewerIdNum = parseInt(reviewerId);
    const paperIdNum = parseInt(paperId);

    // Kiểm tra reviewerId tồn tại
    const userCheckRows = await getRows(
      'SELECT id FROM users WHERE id = ?',
      [reviewerIdNum]
    );
    console.log('userCheckRows:', userCheckRows);
    if (!userCheckRows || userCheckRows.length === 0) {
      throw new Error(`Người dùng với id ${reviewerIdNum} không tồn tại`);
    }

    // Kiểm tra paperId tồn tại
    const paperCheckRows = await getRows(
      'SELECT mabaibao FROM baibao WHERE mabaibao = ?',
      [paperIdNum]
    );
    console.log('paperCheckRows:', paperCheckRows);
    if (!paperCheckRows || paperCheckRows.length === 0) {
      throw new Error(`Bài báo với id ${paperIdNum} không tồn tại`);
    }

    // Kiểm tra phân công phản biện
    const assignmentCheckRows = await getRows(
      'SELECT * FROM phancong_phanbien WHERE mabaibao = ? AND id_user = ?',
      [paperIdNum, reviewerIdNum]
    );
    console.log('assignmentCheckRows:', assignmentCheckRows);
    if (!assignmentCheckRows || assignmentCheckRows.length === 0) {
      throw new Error(`Người dùng ${reviewerIdNum} không được phân công phản biện cho bài báo ${paperIdNum}`);
    }

    // 1. Tạo phiếu nhận xét
    console.log('Attempting to insert into phieunhanxet with:', {
      reviewerId: reviewerIdNum,
      paperId: paperIdNum,
      review
    });

    const noidung = `Hàm lượng khoa học: ${review.scientificValue}\nTính mới: ${review.novelty}\nKết quả nghiên cứu: ${review.researchResults}\nKết luận: ${review.conclusion}`;

    const insertReviewResult = await db.query(
      `INSERT INTO phieunhanxet (id_user, mabaibao, noidung)
       VALUES (?, ?, ?)`,
      [reviewerIdNum, paperIdNum, noidung]
    );

    const insertData = Array.isArray(insertReviewResult)
      ? insertReviewResult[0]
      : insertReviewResult;

    const maphieuncx = insertData.insertId;
    console.log('Created review with maphieuncx:', maphieuncx);

    // 2. Thêm chi tiết nhận xét
    console.log('Attempting to insert into chitiet_phieunhanxet with:', {
      maphieuncx,
      finalDecision: review.finalDecision
    });

    await db.query(
      `INSERT INTO chitiet_phieunhanxet (maphieuncx, ketqua)
       VALUES (?, ?)`,
      [maphieuncx, review.finalDecision]
    );
    console.log('Inserted chitiet_phieunhanxet');

    return { maphieuncx };
  } catch (err) {
    console.error('Error in createReview:', err.message, err.stack);
    throw new Error(`Lỗi khi tạo phiếu nhận xét: ${err.message}`);
  }
};
