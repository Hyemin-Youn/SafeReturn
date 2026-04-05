require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");

// 환경 변수(.env) 로드
dotenv.config();

const routes = require("./routes");

const app = express();
// 포트가 설정되어 있지 않으면 3000번을 사용합니다.
const PORT = process.env.PORT || 3000;

// 프론트엔드에서 보내는 JSON 형식의 데이터를 읽을 수 있게 해주는 필수 미들웨어
app.use(express.json());

// 들어오는 모든 웹 요청을 routes/index.js 로 넘겨서 길을 찾게 합니다.
app.use("/", routes);

app.listen(PORT, () => {
  console.log(
    `🚀 [Server] 안심이음 백엔드 서버가 http://localhost:${PORT} 에서 실행 중입니다!`,
  );
});
