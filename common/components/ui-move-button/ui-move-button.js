// common/components/ui-move-button/ui-move-button.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['out_class'],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    top: 0,
    left: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function () {
      this.triggerEvent('click')
    },
    bindtouchend: function () {
      const { clientY, clientX } = this.data;
      wx.getSystemInfo({
        success: (res) => {
          const { screenHeight, screenWidth } = res;
          if (clientX < 0) {
            this.setData({
              clientX: 15,
            });
          } else if (clientX + 50 > screenWidth) {
            this.setData({
              clientX: screenWidth - 70,
            });
          }
          if (clientY < 0) {
            this.setData({
              clientY: 15,
            });
          } else if (clientY + 200 > screenHeight) {
            this.setData({
              clientY: screenHeight - 200,
            });
          }
          this.setData({
            isMove: false,
          })
        },
      })

    },
    /**
     * 滚动
     */
    bindtouchmove: function (e) {
      const { clientY, clientX } = e.touches[0];
      this.setData({
        clientX: clientX - 15,
        clientY: clientY - 15,
        isMove: true,
      })
    },
  }
})
