const db = require("../database/pool");
exports.insertArticle = async(Article)=>{
   const { tenbaibao, linhvuc, tomtat, tacgia , ngaynop , maht  } = Article;

   try {
        const insertAricleQuery = "insert into baibao(tenbaibao, linhvuc, tomtat , ngaynop) values (?, ?, ? , ?)";
        const result = await db.query(insertAricleQuery , [tenbaibao , linhvuc , tomtat , ngaynop]);
        const mabaibao = result.insertId;
        const insertConferenceQuery = "insert into hoithao_bai(maht , mabaibao) values(? , ?)"

        if(Array.isArray(tacgia) && tacgia.length > 0){
            const insertDetailsQuery = "insert into thamgia(id_tacgia, id_baibao, vai_tro) values (?)";
            const values =tacgia.map(tg =>  [tg.id,mabaibao,tg.vaitro]);

            await db.query(insertDetailsQuery , values);
            await db.query(insertConferenceQuery , [maht , mabaibao])
             return { data: { error: false } };
        }
   } catch (error) {
     console.error("Insert article error:", error);
    return { data: { error: true, message: error.message } };
   }
}

exports.GetAllPapers = async(authorId) =>{
     try {
          const [rows] = await db.query(
      `SELECT baibao.tenbaibao, baibao.linhvuc, baibao.tomtat, baibao.ngaynop
       FROM baibao 
       JOIN thamgia ON baibao.mabaibao = thamgia.id_baibao
       WHERE thamgia.id_tacgia = ?`,
      [authorId]
    );

    return { data: { error: false , papers : [rows] } };
     } catch (error) {
          console.error("Insert article error:", error);
    return { data: { error: true, message: error.message } };
     }
     
}


exports.getAuthorPapers = async (authorId) => {
const sql = `
  SELECT 
    bb.mabaibao AS id,
    bb.tenbaibao AS title,
    bb.linhvuc AS field,
    bb.tomtat AS summary,
    bb.ngaynop AS submission_date,
    bb.status AS status
  FROM baibao bb
  JOIN thamgia tg ON tg.id_baibao = bb.mabaibao
  LEFT JOIN phancong_phanbien pc ON bb.mabaibao = pc.mabaibao
  WHERE tg.id_tacgia = ?
  GROUP BY bb.mabaibao, bb.tenbaibao, bb.linhvuc, bb.tomtat, bb.ngaynop, bb.status
`;



  try {
    const results = await db.query(sql, [authorId]);
    const rows = Array.isArray(results) && Array.isArray(results[0]) ? results[0] : results;

    console.log(rows); 
    if (!Array.isArray(rows)) {
      console.warn("Rows is not an array:", rows);
      return { reviewed: [], pending: [], needs_review: [] };
    }

    // Categorize papers by status
    const categorizedPapers = {
      reviewed: rows.filter((paper) => paper.status === "da_phan_bien"),
      pending: rows.filter((paper) => paper.status === "da_phan_cong"),
      needs_review: rows.filter((paper) => paper.status === "dang_cho_phan_cong"),
    };

    return categorizedPapers;
  } catch (error) {
    console.error("Error in getAuthorPapers:", error);
    throw error;
  }
};