import request from '@/utils/request.js'
/**
 * 获取房屋具体信息接口
 * @param {*} params 传入房间code值
 * @returns
 */
export const getHouseNews = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
