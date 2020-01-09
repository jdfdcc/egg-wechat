import http from './../utils/http.js';
import api from './../utils/api.js';

/**
 * 获取商城地址
 */
const queryList = function (params, success) {
  http({ api: 'shopList', data: params, }).then(result => {
    success && success(result.data);
  })
}

const getDetail = function (id, success) {
  http({ api: 'shopDetail', data: {
    id,
  }, }).then(result => {
    success && success(result.data);
  })
}

export default {
  queryList,
  getDetail,
}
