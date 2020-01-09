import shopHandler from '../../handlers/shopHandler.js';

Page({

  data: {
    detail: {}, // 商品详情
  },

  /**
   * 获取商城列表
   */
  queryList() {
    shopHandler.getDetail(this.options.id, (detail) => {
      this.setData({
        detail,
      });
    });
  },

  /**
   * 点击去购买商品
   */
  buyShop() {
    wx.navigateTo({
      url: `/pages/pay/pay?id=${this.options.id}`,
    })
  },

  onLoad() {
    this.queryList();
  }
})