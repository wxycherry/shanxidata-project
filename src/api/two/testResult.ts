import request from '/@/utils/request';

/**
 * 山西省智能数据辅助诊疗工程研究中心检测结果api接口集合
 */
export function useTwoTestResultApi() {
  return {
    // 查询是否穿刺
    getBiopsyPerformedCount() {
      return request({
        url: '/twoTestResult/getBiopsyPerformedCount',
        method: 'get'
      })
    },
    // MRI检查结果图表数据
    getCount(attr: string) {
      return request({
        url: '/twoTestResult/getCount/' + attr,
        method: 'get'
      })
    },
    // 分页获取山西省智能数据辅助诊疗工程研究中心检测结果
    getPageList(data: object) {
      return request({
        url: '/twoTestResult/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询山西省智能数据辅助诊疗工程研究中心检测结果详细
    getTwoTestResultById(id: number) {
      return request({
        url: '/twoTestResult/' + id,
        method: 'get'
      })
    },
    // 新增山西省智能数据辅助诊疗工程研究中心检测结果
    createTwoTestResult(data: object) {
      return request({
        url: '/twoTestResult/createTwoTestResult',
        method: 'post',
        data: data
      })
    },
    // 修改山西省智能数据辅助诊疗工程研究中心检测结果
    updateTwoTestResult(data: object) {
      return request({
        url: '/twoTestResult/updateTwoTestResult',
        method: 'post',
        data: data
      })
    },
    // 删除山西省智能数据辅助诊疗工程研究中心检测结果
    deleteTwoTestResult(id: number) {
      return request({
        url: '/twoTestResult/' + id,
        method: 'delete'
      })
    },
  }
}