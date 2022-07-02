import request from '@/utils/request.js'
/**
 * 获取城市列表接口
 * @param {Number} level 、1 表示获取所有城市数据 2 表示城市下区的数据
 * @returns
 */
export const getAddressList = (level) => {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}
