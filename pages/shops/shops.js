import shopHandler from '../../handlers/shopHandler.js';

Page({

  data: {
    list: [], // 商品列表
  },

  /**
   * 获取商城列表
   */
  queryList () {
    shopHandler.queryList({}, (data) => {
      const { list, pagination } = data;
      this.setData({
        list,
      });
    });
  },

  /**
   * 跳转到对应的商品详情页面
   */
  toDetail(e) {
    console.log(e.target.dataset);
    const { item } = e.target.dataset;
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${item._id}`,
    })
  },

  onLoad() {
    this.queryList();
  }
})