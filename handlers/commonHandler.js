import http from './../utils/http.js';

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

/**
 * 创建订单接口
 * pay 表示是否直接支付了
 */
const createOrder = function (params, success) {
  const { pay = true, ...otherParams } = params;
  http({
    api: 'createOrder',
    data: otherParams,
  }).then(res => {
    console.log(res)
    const { data } = res;
    if (pay) {
      payOrder(data._id);
    } else {
      success && success(data);
    }
  })
}

/**
 * 支付订单接口
 */
const payOrder = function (orderId) {
  http({
    api: 'payOrder',
    data: {
      orderId,
    },
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

/**
 * 发送消息
 */
const sendInfo = function (orderId) {
  http({
    api: 'payOrder',
    data: {
      orderId,
    },
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
  createOrder,
  payOrder,
}
