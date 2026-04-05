const {pool} = require('../config');

const getFacilities = async (req, res) => {
  try {
    //DB에서 활성화된 시설물 정보만 필요한 핵심 컬럼만 조회
    const query = `
        SELECT id, type, name, lat, lng, status
        FROM safe_facilities
        WHERE status = 'ACTIVE'
        `;

    //2. DB 쿼리 실행
    const [rows] = await pool.query(query);

    //3. 성공 응답 (200 OK)
    res.status(200).json({
      success: true,
      message: "공사현장 및 가로등 데이터를 성공적으로 불러왔습니다.",
      total_count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error(
      "❌ [API 에러] 공사현장 및 가로등 데이터 조회 중 문제 발생:",
      error,
    );

    //4. 실패 응답 (500 Internal Server Error)
    res.status(500).json({
      success: false,
      message: "서버 내부 오류로 데이터를 불러올 수 없습니다.",
    });
  }
};

module.exports = {
  getFacilities,
};
