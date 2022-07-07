import request from '@/utils/request.js'
/**
 * 获取用户信息接口
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}
