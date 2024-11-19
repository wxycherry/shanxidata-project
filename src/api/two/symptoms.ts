import request from '/@/utils/request';

/**
 * 症状评分api接口集合
 */
export function useTwoSymptomsApi() {
  return {
    // 分页获取症状评分
    getPageList(data: object) {
      return request({
        url: '/twoSymptoms/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询症状评分详细
    getTwoSymptomsById(id: number) {
      return request({
        url: '/twoSymptoms/' + id,
        method: 'get'
      })
    },
    // 新增症状评分
    createTwoSymptoms(data: object) {
      return request({
        url: '/twoSymptoms/createTwoSymptoms',
        method: 'post',
        data: data
      })
    },
    // 修改症状评分
    updateTwoSymptoms(data: object) {
      return request({
        url: '/twoSymptoms/updateTwoSymptoms',
        method: 'post',
        data: data
      })
    },
    // 删除症状评分
    deleteTwoSymptoms(id: number) {
      return request({
        url: '/twoSymptoms/' + id,
        method: 'delete'
      })
    },
  }
}