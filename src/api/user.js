import request from '@/utils/request.js'
import store from '@/store/index'

export const getUserInfo = () => {
  return request({
    url: '/user',
    headers: {
      Authorization: store.state.token
    }
  })
}
