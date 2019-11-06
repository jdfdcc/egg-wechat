import commonHandler from '../../handlers/commonHandler.js';
Page({

  data: {
  },

  /**
   * 登录接口
   */
  login(e) {
    commonHandler.login(e.detail)
  },

  getUserInfo() {
    commonHandler.getUserInfo()
  },

  /**
   * 解析用户基本信息
   */
  onGotUserInfo(e) {
    console.log(e);
    commonHandler.decrypt(e.detail)
  },
  /**
   * 解析用户手机号码
   */
  onGotPhoneNumber(e) {
    commonHandler.decrypt(e.detail)
  },

  /**
   * 解析用户手机号码
   */
  wxPay(e) {
    commonHandler.wxPay(e.detail)
  },
})