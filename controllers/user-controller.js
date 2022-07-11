const userService = require('../services/user-service');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');
const user = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  /* 아이디 중복 체크 */
  idcheck: async(req, res) => {
    const { username } = req.body;
    console.log(req.body);
    if(!username){  //정보 기재 부족
      return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
    try {
      const res_service = await userService.idcheck(username);
      console.log(res_service);
      if(res_service != null){  //중복된 아이디 존재
        return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.IDCHECK_FAIL));
      } 
      else{  //중복된 아이디 없음
        return res.status(sc.OK).send(rb.success(sc.OK, rm.IDCHECK_SUCCESS));
      }
    } catch(err){
      console.error(err);
      return res.send(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNUP_FAIL));
    }
  },
  /* 회원 가입 */
  signup: async(req, res) => {
    const { username, pwd, email } = req.body;
    console.log(req.body);
    if(!username || !pwd || !email){  //정보 기재 부족
      return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
    try {
      const res_service = await userService.signup(username, pwd, email);
      return res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.SIGNUP_SUCCESS, res_service));
    } catch(err){
      console.error(err);
      return res.send(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNUP_FAIL));
    }
  },
  /* 로그인 */
  signin: async(req, res) => {
    const { username, pwd } = req.body;
    console.log(req.body);
    if(!username || !pwd){  //정보 기재 부족
      return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
    try {
      const user = await userService.signin(username);
      console.log(user);
      if(user == null){  //존재하지 않는 아이디
        return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NO_ACCOUNT));
      } 
      if(bcrypt.compareSync(pwd, user.pwd) == false){  //패스워드 불일치
        return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.MISMATCH_PWD));
      }
      //계정 일치(로그인 성공)
      return res.status(sc.OK).send(rb.successData(sc.OK, rm.SIGNIN_SUCCESS, user));
    } catch(err){
      console.error(err);
      return res.send(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNIN_FAIL));
    }
  }
}