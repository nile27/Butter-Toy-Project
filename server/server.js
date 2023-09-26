const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

const secretKey = "your-secret-key"; // JWT 토큰에 사용할 비밀 키

// 로그인 라우트: 간단한 로그인 로직. 테스트용으로 사용하므로 실제로는 복잡한 로직이 들어갈 것입니다.
app.post("/login", (req, res) => {
  // 사용자 인증 과정을 통해 userId와 userName을 얻어옴
  const userId = "123";
  const userName = "john_doe";

  // JWT 토큰 생성
  const accessToken = jwt.sign({ userId, userName }, secretKey, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId, userName }, secretKey, {
    expiresIn: "7d",
  });

  res.json({ accessToken, refreshToken });
});

// 토큰 갱신 라우트
app.post("/refresh-token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { userId: user.userId, userName: user.userName },
      secretKey,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
