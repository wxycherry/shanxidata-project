import request from '/@/utils/request';

/**
 * 既往病史信息api接口集合
 */
export function useTwoHistoryApi() {
  return {
    // 查询前列腺癌家族史
    getFamilyCancerCount() {
      return request({
        url: '/twoHistory/getFamilyCancerCount',
        method: 'get'
      })
    },
    // 分页获取既往病史信息
    getPageList(data: object) {
      return request({
        url: '/twoHistory/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询既往病史信息详细
    getTwoHistoryById(id: number) {
      return request({
        url: '/twoHistory/' + id,
        method: 'get'
      })
    },
    // 新增既往病史信息
    createTwoHistory(data: object) {
      return request({
        url: '/twoHistory/createTwoHistory',
        method: 'post',
        data: data
      })
    },
    // 修改既往病史信息
    updateTwoHistory(data: object) {
      return request({
        url: '/twoHistory/updateTwoHistory',
        method: 'post',
        data: data
      })
    },
    // 删除既往病史信息
    deleteTwoHistory(id: number) {
      return request({
        url: '/twoHistory/' + id,
        method: 'delete'
      })
    },
  }
}