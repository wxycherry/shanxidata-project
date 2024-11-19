import request from '/@/utils/request';

/**
 * 社区检测结果信息api接口集合
 */
export function useTwoCheckupelseApi() {
  return {
    // 分页获取社区检测结果信息
    getPageList(data: object) {
      return request({
        url: '/twoCheckupelse/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询社区检测结果信息详细
    getTwoCheckupelseById(id: number) {
      return request({
        url: '/twoCheckupelse/' + id,
        method: 'get'
      })
    },
    // 新增社区检测结果信息
    createTwoCheckupelse(data: object) {
      return request({
        url: '/twoCheckupelse/createTwoCheckupelse',
        method: 'post',
        data: data
      })
    },
    // 修改社区检测结果信息
    updateTwoCheckupelse(data: object) {
      return request({
        url: '/twoCheckupelse/updateTwoCheckupelse',
        method: 'post',
        data: data
      })
    },
    // 删除社区检测结果信息
    deleteTwoCheckupelse(id: number) {
      return request({
        url: '/twoCheckupelse/' + id,
        method: 'delete'
      })
    },
  }
}