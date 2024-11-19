import request from '/@/utils/request';

/**
 * 一般情况信息api接口集合
 */
export function useTwoGeneralApi() {
  return {
    // 年龄统计
    getAgeCount() {
      return request({
        url: '/twoGeneral/getAgeCount',
        method: 'get'
      })
    },
    // 分页获取一般情况信息
    getPageList(data: object) {
      return request({
        url: '/twoGeneral/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询一般情况信息详细
    getTwoGeneralById(id: number) {
      return request({
        url: '/twoGeneral/' + id,
        method: 'get'
      })
    },
    // 新增一般情况信息
    createTwoGeneral(data: object) {
      return request({
        url: '/twoGeneral/createTwoGeneral',
        method: 'post',
        data: data
      })
    },
    // 修改一般情况信息
    updateTwoGeneral(data: object) {
      return request({
        url: '/twoGeneral/updateTwoGeneral',
        method: 'post',
        data: data
      })
    },
    // 删除一般情况信息
    deleteTwoGeneral(id: number) {
      return request({
        url: '/twoGeneral/' + id,
        method: 'delete'
      })
    },
  }
}