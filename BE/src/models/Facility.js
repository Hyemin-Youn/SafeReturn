const pool = require("../config/db");

class Facility {
  /**
   * 정제된 공공데이터 배열을 DB에 UPSERT 합니다.
   * @param {Array} facilities - API에서 정제한 시설물 객체 배열
   */
  static async initTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS safe_facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        source VARCHAR(50) NOT NULL,
        source_id VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        gu_name VARCHAR(50),
        address VARCHAR(255),
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        status VARCHAR(20) DEFAULT 'ACTIVE',
        extra_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_source_id (source_id)
      );
    `;

    try {
      await pool.query(createTableQuery);
      console.log("✅ [DB] safe_facilities 테이블 확인/생성 완료");
    } catch (error) {
      console.error("❌ [DB] 테이블 생성 중 오류:", error);
    }
  }
  static async bulkUpsert(facilities) {
    if (!facilities || facilities.length == 0) return 0;

    // 1. DB에 넣을 데이터 배열을 2차원 배열 형태로 변환합니다. [ [값1, 값2...], [값1, 값2...] ]
    const values = facilities.map((f) => [
      f.source,
      f.source_id,
      f.type,
      f.name,
      f.gu_name,
      f.address,
      f.lat,
      f.lng,
      f.status,
      JSON.stringify(f.extra_json), // JSON 객체는 문자열로 변환해서 저장
    ]);

    // 2. INSERT ... ON DUPLICATE KEY UPDATE 쿼리 작성
    // source_id (예: LIGHT_12345)를 UNIQUE KEY로 설정해두어야 제대로 작동합니다.
    const query = `
    INSERT INTO safe_facilities
    (source, source_id, type, name, gu_name, address, lat, lng, status, extra_json)
    VALUES ?
    ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    address = VALUES(address),
    latitude = VALUES(lat),
    longitude = VALUES(lng),
    status = VALUES(status),
    extra_json = VALUES(extra_json),
    updated_at = NOW();
    `;

    try {
      // 3. 쿼리 실행 (values 배열은 한번에 ? 에 매핑됩니다)
      const [result] = await pool.query(query, [values]);
      return result.affectedRows;
    } catch (error) {
      console.error("❌ DB 저장 중 오류 발생:", error);
      throw error;
    }
  }
}

module.exports = Facility;
