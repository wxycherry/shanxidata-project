<template>
  <div class="two-twoGeneral-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoGeneral-search">
        <el-form :inline="true" ref="twoGeneralSearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="身份证号码" class="ml20" size="default" prop="patientId">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入身份证号码" clearable
                        style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="姓名" class="ml20" size="default" prop="name">
              <el-input v-model="state.tableData.param.query.name" placeholder="请输入姓名" clearable
                        style="max-width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="年龄范围" class="ml20" size="default" prop="ageRange">
              <el-input-number v-model="ageRange.min"
                               controls-position="right"
                               :min="0"
                               :max="120"
                               placeholder="请输入最小年龄"
                               @change="onChangeAgeRange"
                               style="width: 160px"/>
              至
              <el-input-number v-model="ageRange.max"
                               :min="0"
                               :max="120"
                               placeholder="请输入最大年龄"
                               controls-position="right"
                               @change="onChangeAgeRange"
                               style="width: 160px"/>
            </el-form-item>
            <el-form-item label="核磁排序" class="ml20" size="default" prop="mriPerformed">
              <el-select v-model="state.tableData.param.query.mriPerformed" placeholder="请选择" style="width: 90px">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="穿刺排序" class="ml20" size="default" prop="biopsyPerformed">
              <el-select v-model="state.tableData.param.query.biopsyPerformed" placeholder="请选择" style="width: 90px">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="穿刺结果" class="ml20" size="default" prop="biopsyResult">
              <el-select v-model="state.tableData.param.query.biopsyResult" placeholder="请选择" style="width: 120px">
                <el-option label="阴性" value="0"></el-option>
                <el-option label="阳性" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-button size="default" type="primary" class="ml20" @click="getTableData">
              <el-icon>
                <ele-Search/>
              </el-icon>
              查询
            </el-button>
            <el-button size="default" class="ml20" @click="resetQuery()">
              <el-icon>
                <ele-Refresh/>
              </el-icon>
              重置
            </el-button>
            <el-button size="default" type="success" plain class="ml30" @click="onOpenGeneralDialogAdd('add')">
              <el-icon>
                <ele-FolderAdd/>
              </el-icon>
              新增
            </el-button>
            <!-- 覆盖上一个文件 -->
            <el-upload
                ref="upload"
                class="upload-demo"
                :http-request="handleUpload"
                :limit="1"
                :on-exceed="handleExceed"
                :show-file-list="false"
                accept=".xls,.xlsx"
            >
              <el-button size="default" type="success" plain class="ml30" @click="importData()">
                <el-icon>
                  <ele-FolderAdd/>
                </el-icon>
                导入
              </el-button>
            </el-upload>

            <el-button size="default" type="success" plain class="ml30" @click="exportData()">
              <el-icon>
                <ele-FolderAdd/>
              </el-icon>
              导出
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-table :data="state.tableData.records" v-loading="state.tableData.loading" style="width: 100%">
        <!--        <el-table-column type="index" label="序号" width="60" />-->
        <!--        <el-table-column label="编号" prop="id" show-overflow-tooltip/>-->
        <el-table-column label="身份证号码" prop="patientId" show-overflow-tooltip width="200px"/>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip/>
        <el-table-column label="年龄" prop="age" show-overflow-tooltip/>
        <el-table-column label="入组时间" prop="checkupTime" :formatter="formatTime" show-overflow-tooltip/>
        <el-table-column label="是否核磁" prop="mriPerformed" :formatter="formatStatus('mriPerformed')"
                         show-overflow-tooltip/>
        <el-table-column label="是否穿刺" prop="biopsyPerformed" :formatter="formatStatus('biopsyPerformed')"
                         show-overflow-tooltip/>
        <el-table-column label="穿刺结果" prop="result" :formatter="formatStatus('result')"
                         show-overflow-tooltip/>
        <el-table-column label="病例单" show-overflow-tooltip>
          <template #default="scope">
            <el-button type="success" @click='onOpenCaseSheetDialogEdit("edit", scope.row)'>进入</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <!--            <el-button size="small" text type="primary" @click="onOpenGeneralDialogEdit('edit', scope.row)">修改-->
            <!--            </el-button>-->
            <el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          class="mt15"
          :pager-count="5"
          :page-sizes="[10, 20, 30]"
          v-model:current-page="state.tableData.param.page.current"
          background
          v-model:page-size="state.tableData.param.page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="state.tableData.total"
      >
      </el-pagination>
    </el-card>
    <!-- 基本信息 -->
    <TwoGeneralDialog ref="twoGeneralDialogRef" @refresh="getTableData()"/>
    <!-- 病例单信息 -->
    <TwoCaseSheetDialog ref="twoCaseSheetDialogRef" @refresh="getTableData()"/>
  </div>
</template>

<script setup lang="ts" name="twoGeneral">
import {defineAsyncComponent, reactive, onMounted, ref, watch, nextTick, getCurrentInstance} from 'vue';
import {ElMessageBox, ElMessage} from 'element-plus';
import {useTwoGeneralApi} from '/@/api/two/general';
import {useTwoHistoryApi} from "/@/api/two/history";
import {useTwoExcelApi} from "/@/api/two/excel";
import {formatDate} from '/@/utils/formatTime';

// 引入组件
const TwoGeneralDialog = defineAsyncComponent(() => import('./dialog.vue'));
const TwoCaseSheetDialog = defineAsyncComponent(() => import('../caseSheet/TwoDetail.vue'));

// 定义变量内容
const twoGeneralDialogRef = ref();
const twoCaseSheetDialogRef = ref();
const twoGeneralSearchRef = ref();

// 定义API
const useTwoGeneral = useTwoGeneralApi();
const useTowHistory = useTwoHistoryApi();

const state = reactive({
  tableData: {
    records: [],
    total: 0,
    loading: false,
    param: {
      page: {
        current: 1,
        size: 10,
      },
      query: {
        patientId: '',
        name: '',
        ageRange: '',
        mriPerformed: '',
        biopsyPerformed: '',
        biopsyResult: '',
      },
    },
  },
  status: {
    mriPerformed: {
      0: '否',
      1: '是',
      null: '无'
    },
    biopsyPerformed: {
      0: '否',
      1: '是',
      null: '无'
    },
    result: {
      0: '阴性',
      1: '腺泡腺癌',
      2: '导管内癌',
      3: '导管腺癌',
      4: 'NECP',
      5: '其他',
      6: '阳性',
      null: '无'
    }
  }
});
const ageRange = reactive({
  min: null,
  max: null,
});
const onChangeAgeRange = () => {
  if (ageRange.min !== null && ageRange.max !== null && ageRange.min > ageRange.max) {
    [ageRange.min, ageRange.max] = [ageRange.max, ageRange.min]
  }
  const min = ageRange.min === null ? '' : ageRange.min
  const max = ageRange.max === null ? '' : ageRange.max
  state.tableData.param.query.ageRange = `${min}_${max}`;
}

// 初始化表格数据
const getTableData = () => {
  state.tableData.loading = true;
  useTwoGeneral.getPageList(state.tableData.param).then(res => {
    state.tableData.records = res.records;
    state.tableData.total = res.total;
  });
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

// 表格数据回显
const formatTime = (row: any, column: any, cellValue: any, index: number) => {
  if (cellValue == null) return "未填写";
  return formatDate(new Date(cellValue), "YYYY-mm-dd");
}

// 回显数据
const formatStatus = (type: string) => {
  return (row: any, column: any, cellValue: any, index: number) => {
    // 根据type选择正确的映射表
    const statusMap = state.status[type];
    const res = statusMap[cellValue] || '未填写';
    // console.log(res);
    return res;
  };
};

// 导出数据
const exportData = () => {
  useTwoExcelApi().exportData();
};
// 打开新增一般情况信息弹窗
const onOpenGeneralDialogAdd = (type: string) => {
  twoGeneralDialogRef.value.openDialog(type);
};
// 打开修改一般情况信息弹窗
const onOpenGeneralDialogEdit = (type: string, row: any) => {
  twoGeneralDialogRef.value.openDialog(type, row);
};
// 打开修改病例单信息弹窗
const onOpenCaseSheetDialogEdit = (type: string, row: any) => {
  twoCaseSheetDialogRef.value.openDialog(type, row);
};

// 删除一般情况信息
const onRowDel = (row: any) => {
  ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        useTwoGeneral.deleteTwoGeneral(row.id).then(() => {
          getTableData();
          ElMessage.success('删除成功');
        });
      })
      .catch(() => {
        ElMessage.error('删除失败');
      });
};
// 重置搜索框
const resetQuery = () => {
  twoGeneralSearchRef.value.resetFields();
  ageRange.min = null;
  ageRange.max = null;
  getTableData();
}
// 分页改变
const onHandleSizeChange = (val: number) => {
  state.tableData.param.page.size = val;
  getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
  state.tableData.param.page.current = val;
  getTableData();
};
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.two-twoGeneral-container {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .el-table {
      flex: 1;
    }
  }
}
</style>
