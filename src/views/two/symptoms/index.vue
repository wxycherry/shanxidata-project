<template>
  <div class="two-twoSymptoms-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoSymptoms-search">
        <el-form :inline="true" ref="twoSymptomsSearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="身份证号码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入身份证号码" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="评分时间" class="ml20" prop="scoreTime">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.scoreTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择评分时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="IPSS得分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.ipssScore" placeholder="请输入IPSS得分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="QoL得分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.qolScore" placeholder="请输入QoL得分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="OABSS得分" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.oabssScore" placeholder="请输入OABSS得分" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-button size="default" type="primary" class="ml20" @click="getTableData">
              <el-icon><ele-Search /></el-icon> 查询
            </el-button>
            <el-button size="default" class="ml20" @click="resetQuery">
              <el-icon><ele-Refresh /></el-icon> 重置
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="35">
          <el-button size="default" type="success" plain class="ml30" @click="onOpenAdd('add')">
            <el-icon><ele-FolderAdd /></el-icon> 新增
          </el-button>
      </el-row>
      <el-table :data="state.tableData.records" v-loading="state.tableData.loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="编号" prop="id" show-overflow-tooltip/>
        <el-table-column label="身份证号码" prop="patientId" show-overflow-tooltip/>
        <el-table-column label="评分时间" prop="scoreTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.scoreTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IPSS数据" prop="ipssInfo" show-overflow-tooltip/>
        <el-table-column label="IPSS得分" prop="ipssScore" show-overflow-tooltip/>
        <el-table-column label="QoL数据" prop="qolInfo" show-overflow-tooltip/>
        <el-table-column label="QoL得分" prop="qolScore" show-overflow-tooltip/>
        <el-table-column label="OABSS数据" prop="oabssInfo" show-overflow-tooltip/>
        <el-table-column label="OABSS得分" prop="oabssScore" show-overflow-tooltip/>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenEdit('edit', scope.row)">修改</el-button>
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
    <TwoSymptomsDialog ref="twoSymptomsDialogRef" @refresh="getTableData()" />
  </div>
</template>

<script setup lang="ts" name="twoSymptoms">
  import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useTwoSymptomsApi } from '/@/api/two/symptoms';
  import { parseDateTime } from '/@/utils/formatTime';
  
  // 引入组件
  const TwoSymptomsDialog = defineAsyncComponent(() => import('./dialog.vue'));

  // 定义变量内容
  const twoSymptomsDialogRef = ref();
  const twoSymptomsSearchRef = ref();
  const useTwoSymptoms = useTwoSymptomsApi();
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
          scoreTime: '',
          ipssScore: '',
          qolScore: '',
          oabssScore: '',
        },
      },
    },
  });

  // 初始化表格数据
  const getTableData = () => {
    state.tableData.loading = true;
    useTwoSymptoms.getPageList(state.tableData.param).then(res => {
      state.tableData.records = res.records;
      state.tableData.total = res.total;
    });
    setTimeout(() => {
      state.tableData.loading = false;
    }, 500);
  };
  // 打开新增症状评分弹窗
  const onOpenAdd = (type: string) => {
    twoSymptomsDialogRef.value.openDialog(type);
  };
  // 打开修改症状评分弹窗
  const onOpenEdit = (type: string, row) => {
    twoSymptomsDialogRef.value.openDialog(type, row);
  };
  // 删除症状评分
  const onRowDel = (row) => {
    ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          useTwoSymptoms.deleteTwoSymptoms(row.id).then(() => {
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
    nextTick(() => {
        twoSymptomsSearchRef.value.resetFields();
    });
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
  .two-twoSymptoms-container {
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
