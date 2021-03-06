// 配置具体的请求方式
import httpConfig from './httpConfig.js';

// 环境切换 test uat pro
const http = httpConfig.test

/**
 * @name  生成对于的函数对象
 * @param url 地址
 * @param method 请求方法
 * @param liading 是否显示加载框
 * @param autoToast 当接口失败的时候是否自动进行数据提示
 */
const config = function (url, method = 'GET', loading = true, autoToast = true, autoReg = true) {
  return {
    url,
    method,
    loading,   // 自动显示加载框...
    autoToast, // 自动处理返回数据 直接toast提示
    autoReg,   //  自动处理未注册接口
  }
}

// 配置接口调用方式
export default {
  collectFormId: config(`${http.SHOP}/wx/user/collectFormId`),
  // 微信登录
  wxlogin: config(`${http.SHOP}/wx/user/login`, 'POST'),
  decrypt: config(`${http.SHOP}/wx/user/decrypt`, 'POST'),
  userInfo: config(`${http.SHOP}/wx/user/info`),
  wxPay: config(`${http.SHOP}/wx/pay`, 'POST'),
  createOrder: config(`${http.SHOP}/wx/order/create`, 'POST'),
  payOrder: config(`${http.SHOP}/wx/order/pay`, 'POST'),
  // 获取商城列表
  shopList: config(`${http.SHOP}/wx/shop/list`, 'POST'),
  shopDetail: config(`${http.SHOP}/wx/shop/detail`),
}
export const httpObj = http;
