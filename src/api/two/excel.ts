import request from '/@/utils/request';

/**
 * 导出接口
 */
export function useTwoExcelApi() {
  return {
    // 导出数据
    exportData() {
      return request({
        url: '/twoExcel/exportData1',
        method: 'get',
        responseType: "blob"
      })
    },
    // 导入数据
    importData(data: object) {
      return request({
        url: '/twoExcel/importData1',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }
}