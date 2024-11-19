import request from '/@/utils/request';

/**
 * 社区检测结果信息（PSA）api接口集合
 */
export function useTwoPsacheckupApi() {
  return {
    // PSA检查结果图表数据
    getCount(attr: string) {
      return request({
        url: '/twoPsacheckup/getCount/' + attr,
        method: 'get'
      })
    },
    // 分页获取社区检测结果信息（PSA）
    getPageList(data: object) {
      return request({
        url: '/twoPsacheckup/getPageList',
        method: 'post',
        data: data
      })
    },
    // 查询社区检测结果信息（PSA）详细
    getTwoPsacheckupById(id: number) {
      return request({
        url: '/twoPsacheckup/' + id,
        method: 'get'
      })
    },
    // 新增社区检测结果信息（PSA）
    createTwoPsacheckup(data: object) {
      return request({
        url: '/twoPsacheckup/createTwoPsacheckup',
        method: 'post',
        data: data
      })
    },
    // 修改社区检测结果信息（PSA）
    updateTwoPsacheckup(data: object) {
      return request({
        url: '/twoPsacheckup/updateTwoPsacheckup',
        method: 'post',
        data: data
      })
    },
    // 删除社区检测结果信息（PSA）
    deleteTwoPsacheckup(id: number) {
      return request({
        url: '/twoPsacheckup/' + id,
        method: 'delete'
      })
    },
  }
}