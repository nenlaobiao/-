import request from '@/utils/request.js'
import store from '@/store/index'

/**
 *用户登录请求接口
 * @param {Object} 需要包含账号密码格式：{username:xxx ,password:xxx}
 * @returns
 */
export const LoginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}
export const LogoutAPI = () => {
  return request({
    method: 'POST',
    url: '/user/logout',
    headers: {
      Authorization: store.state.token
    }
  })
}
