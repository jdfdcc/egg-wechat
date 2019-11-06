import http from './../utils/http.js';
import api from './../utils/api.js';
import { updateToken, updateOpenId, updateUserInfo as updateUser } from './../redux/actions/action.js'
import store from './../redux/index.js';
import { httpObj } from '../api/api.js';
/**
 * 登录接口
 */
const login = function () {
  http({
    api: 'wxlogin',
    noLogin: true,
  }).then(res => {
    console.log(res)
  })
}

/**
 * 解析用户基本信息并保存到数据库
 */
const decrypt = function (params) {
  http({
    api: 'decrypt',
    data: {
      ...params,
    }
  }).then(res => {
    console.log(res)
  })
}

/**
 * 登录接口
 */
const getUserInfo = function () {
  http({
    api: 'userInfo',
  }).then(res => {
    console.log(res)
  })
}

/**
 * 登录接口
 */
const wxPay = function () {
  http({
    api: 'wxPay',
  }).then(res => {
    console.log(res)
    const { data } = res;
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
    })
  })
}

export default {
  login,
  decrypt,
  getUserInfo,
  wxPay,
}
