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

  makeOrder() {
    this.sendInfo();
    commonHandler.createOrder({
      shopId: '5dcff32e64217e5e6001ee77', // 商品ID
      priceId: 'JfjtF8fRkHJMj2DtNFi6Qs6jQAattJiN', // 价格ID
    })
  },

  payOrder() {
    commonHandler.payOrder({
      orderId: "5dcff963aab19260a06c730d", // 订单
    })
  },
  
  // 发送消息
  sendInfo() {
    wx.requestSubscribeMessage({
      tmplIds: ['gOCc3zriJ7F2FtBO59ARLugD8V9nCm0KVKqWo6_dKF0'],
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      }
    })
    // commonHandler.sendInfo({
    //   orderId: "5dcff963aab19260a06c730d", // 订单
    // })
  }
})