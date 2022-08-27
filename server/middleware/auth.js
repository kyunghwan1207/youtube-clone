const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth; // 쿠키에서 토큰 가져온다

  User.findByToken(token, (err, user) => { // models.User에서 사용되는 함수(statics)
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    // user가 있는 경우
    req.token = token;
    req.user = user;
    next(); // "/api/users/auth" get요청에서 미들웨어 끝나고나서 cb함수 할게 있으니까 next로 넘겨준다.(next없으면 middleware에 멈춰있음)
  });
};

module.exports = { auth };
