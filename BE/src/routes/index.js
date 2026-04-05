const express = require("express");
const router = express.Router();
const mapRoutes = require("./mapRoutes");

// 프론트엔드가 GET 방식으로 아래 주소를 호출하면 getFacilities 함수가 실행됩니다.
router.use("/api/map", mapRoutes);

module.exports = router;
