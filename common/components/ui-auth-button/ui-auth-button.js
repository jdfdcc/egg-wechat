import ReduxConnect from './../../../assets/libs/redux/ReduxConnect.js';
import { updateAuthInfo, updateUserInfo, updateCode } from './../../../redux/actions/action.js';
import store from './../../../redux/index.js';
import http from './../../../utils/http.js';
import api from '../../../utils/api.js';
import config from '../../../config/config.js';
import utils from '../../../utils/util.js';
import handler from './handler.js';

// 此处定义的参数只会执行一次
Component(ReduxConnect({
  externalClasses: ['out_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: {   // 设置默认的显示文字
      type: String,
      value: '立即授权'
    },
    openType: {   // 设置默认的按钮类型
      type: String,
      value: 'getUserInfo'
    },
    scopeType: {      // 设置需要校验的类型 eg scope.writePhotosAlbum
      type: String,
      value: 'scope.userInfo'
    },
    needInitAuth: {   // 判断是否需要先进行点击
      type: Boolean,
      default: false
    }
  },

  data: {
    authInfo: {},
    needAuthAlert: false,
    loadding: true
  },

  methods: {
    // 打开设置的页面的回调
    opensetting: function (res) {
      updateAuthInfo(res.detail.authSetting)
    },

    initAuthAlert: function (res) {
      this.triggerEvent('initAuthAlert');
      this.setData({ needAuthAlert: false })
    },
    // 授权成功后的回调
    getUserInfo: function (res) {
      if (res.detail.errMsg === 'getUserInfo:ok') {

        // 默认更新用户头像和昵称
        let userInfo = res.detail.userInfo
        let { iv, encryptedData } = res.detail
        api.getCode().then(code => {
          let req = {
            biz_no: config.resource,
            iv,
            encryptedData,
            code
          }
          // updateUserInfo(res.detail)
          // 授权成功的返回
          
          http('authorize', req).then(e => {
            this.triggerEvent('success');
            // 调用后台授权成功的返回
            if (e.userId) {
              updateAuthInfo({ ['scope.userInfo']: true })
              // res.detail._id = e.userId
              // 更新用户信息
              handler.getAuthInfo(cb => {
                this.triggerEvent('authSuccess')
              })
            } else {
              utils.toast('授权用户信息失败,请稍后重试')
              updateCode('')
              updateAuthInfo({ ['scope.userInfo']: false })
            }
          })
        })
      }
    },

    /**
     * @name 判断用户是否有权限
     * @param hasUserInfoAuth 是否拥有获取用户信息的权限
     */
    judgeUserAuth: function (hasUserInfoAuth = false) {
      wx.getSetting({
        success: (res) => {
          
          let { scopeType, openType, needInitAuth } = this.data
          let setObj = res.authSetting

          // 当后台或者前台有一个用户没有授权的 则需要重新获取用户信息
          // if (!setObj['scope.userInfo']) {
          // 用户的授权状态全部根根据后端返回的状态去判断
          setObj['scope.userInfo'] = hasUserInfoAuth
          // }

          // if (hasUserInfoAuth) {
          //   setObj['scope.userInfo'] = true
          // }
          // 如果设置权限对象拥有此属性且已经设置为false 则打开设置页面
          if (setObj) {
            updateAuthInfo(setObj)
          }

          // 地址信息特殊判断
          if (!setObj[scopeType] && scopeType !== 'scope.userInfo') {
            switch (scopeType){
              case "scope.userLocation":
                wx.getLocation({
                  type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                  success: (res) => {
                    this.judgeUserAuth()
                    this.triggerEvent('success')
                  },
                  fail: error => {
                    console.error(error)
                  }
                })
                break;
              case 'scope.writePhotosAlbum':
                wx.saveImageToPhotosAlbum({
                  success(res) {
                    this.judgeUserAuth()
                    this.triggerEvent('success')
                  }
                })
                break;
            }
          }
          // if (scopeType === 'scope.userLocation' && !setObj[scopeType]) {
            
          // }

          // if (scopeType === 'scope.userLocation' && !setObj[scopeType]) {
          //   wx.getLocation({
          //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          //     success: (res) => {
          //       this.judgeUserAuth()
          //       this.triggerEvent('success')
          //     },
          //     fail: error => {
          //       console.error(error)
          //     }
          //   })
          // }

          // 是否需要初始化弹出框
          if (needInitAuth && !setObj.hasOwnProperty(scopeType)) {
            this.setData({
              needAuthAlert: true
            })
          }
        }
      })
    }
  },

  // 初始化操作
  ready: function (e) {
    // 初始化数据
    const { base } = store.getState();
    const { openType } = this.data
    if (openType === 'getUserInfo') {
      handler.getAuthInfo(hasAuth => {
        // 停止查询
        this.setData({ loadding: false })
        this.judgeUserAuth(hasAuth)
      })
    } else {
      this.judgeUserAuth(true)
    }
  }
}, ['base']))
