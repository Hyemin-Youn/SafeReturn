require("dotenv").config();
const express = require("express");
const cors = require("cors"); // CORS 패키지 추가
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. CORS 설정: 프론트엔드(5173)의 접근을 허용합니다.
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // 쿠키나 인증 헤더를 허용할 경우
};
app.use(cors(corsOptions));

// 2. 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // FormData 처리를 위한 설정

// 3. 정적 파일 제공 (제보된 사진 등을 브라우저에서 볼 수 있게 함)
// 만약 이미지를 'uploads' 폴더에 저장한다면 아래 설정이 필요합니다.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. 라우팅 설정
app.use("/", routes);

// 5. 서버 실행
app.listen(PORT, () => {
  console.log(
    `🚀 [Server] 안심이음 백엔드 서버가 http://localhost:${PORT} 에서 실행 중입니다!`,
  );
  console.log(`✅ [CORS] http://localhost:5173 의 요청을 허용합니다.`);
});