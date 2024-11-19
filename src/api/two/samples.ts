import request from '/@/utils/request';

/**
 * 生物样本信息api接口集合
 */
export function useTwoSamplesApi() {
  return {
    // 分页获取生物样本信息
    getPageList(data: object) {
      return request({
        url: '/twoSamples/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询生物样本信息详细
    getTwoSamplesById(id: number) {
      return request({
        url: '/twoSamples/' + id,
        method: 'get'
      })
    },
    // 新增生物样本信息
    createTwoSamples(data: object) {
      return request({
        url: '/twoSamples/createTwoSamples',
        method: 'post',
        data: data
      })
    },
    // 修改生物样本信息
    updateTwoSamples(data: object) {
      return request({
        url: '/twoSamples/updateTwoSamples',
        method: 'post',
        data: data
      })
    },
    // 删除生物样本信息
    deleteTwoSamples(id: number) {
      return request({
        url: '/twoSamples/' + id,
        method: 'delete'
      })
    },
  }
}