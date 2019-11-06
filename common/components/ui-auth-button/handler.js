import { updateAuthInfo, updateUserInfo, updateCode } from './../../../redux/actions/action.js';
import http from './../../../utils/http.js';
import store from './../../../redux/index.js';

/**
 * @name 按钮获取判断用户是否有权限
 */
export default {
  /**
   * 从后台获取用户基本信息
   */
  getAuthInfo: function (cb = () => { }) {
    let userInfo = store.getState().base.user;
    const { compulsion } = userInfo || {};
    if (userInfo) {
      cb(compulsion);
      return
    }
    http('hasAuth').then(res => {
      // 如果后天拥有授权信息 则为true
      if (res.result && res.result.compulsion) {
        updateUserInfo(res.result);
        cb(true);
      } else {
        cb(false);
      }
    }).catch(error => {
      cb(false)
    })
  }

}
