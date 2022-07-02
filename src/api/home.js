import request from '@/utils/request.js'
export const getGroupInfo = () => {
  return request({
    url: '/home/groups',
    params: {
      area: 'AREA|88cff55c-aaa4-e2e0'
    }
  })
}
export const GroupInfo = () => {
  return request({
    url: '/home/groups',
    params: {
      area: 'AREA|88cff55c-aaa4-e2e0'
    }
  })
}