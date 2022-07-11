var express = require('express');
const userController = require('../controllers/user-controller');
const user = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//[POST] 아이디 중복 체크
router.post('/idcheck', userController.idcheck);
//[POST] 회원가입
router.post('/signup', userController.signup);
//[POST] 로그인
router.post('/signin', userController.signin);

module.exports = router;
