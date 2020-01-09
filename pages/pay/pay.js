import shopHandler from '../../handlers/shopHandler.js';
import commonHandler from '../../handlers/commonHandler.js';

Page({

  data: {
    detail: {}, // 商品详情
    priceDetail: {
      items: [],
    }
  },

  /**
   * 获取商城列表
   */
  queryList() {
    shopHandler.getDetail(this.options.id, (detail) => {
      this.setData({
        detail,
        priceDetail: detail.priceDetail
      });
    });
  },

  /**
   * 点击去购买商品
   */
  toPay(e) {
    console.log(e.target.dataset);
    const { item } = e.target.dataset;
    commonHandler.createOrder({
      shopId: this.options.id, // 商品ID
      priceId: item.uuid, // 价格ID
    }, res => {

    })
  },

  onLoad() {
    this.queryList();
  }
})