<template>
  <div class="two-twoSamples-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoSamples-search">
        <el-form :inline="true" ref="twoSamplesSearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="身份证号码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入身份证号码" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="血样标本留存 0=否 1=是" class="ml20" prop="bloodSample">
              <el-select v-model="state.tableData.param.query.bloodSample" placeholder="请选择血样标本留存 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_blood_sample"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="血样留存时间" class="ml20" prop="bloodSampleTime">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.bloodSampleTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择血样留存时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="血样编码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.bloodSampleCode" placeholder="请输入血样编码" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="尿液标本留存 0=否 1=是" class="ml20" prop="urineSample">
              <el-select v-model="state.tableData.param.query.urineSample" placeholder="请选择尿液标本留存 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_urine_sample"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="尿液留存时间" class="ml20" prop="urineSampleTime">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.urineSampleTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择尿液留存时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="尿液编码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.urineSampleCode" placeholder="请输入尿液编码" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="组织标本留存 0=否 1=是" class="ml20" prop="tissueSample">
              <el-select v-model="state.tableData.param.query.tissueSample" placeholder="请选择组织标本留存 0=否 1=是" clearable>
                <el-option
                  v-for="dict in two_history_tissue_sample"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="组织留存时间" class="ml20" prop="tissueSampleTime">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.tissueSampleTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择组织留存时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="组织编码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.tissueSampleCode" placeholder="请输入组织编码" clearable
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
        <el-table-column label="血样标本留存 0=否 1=是" prop="bloodSample" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_blood_sample[scope.row.bloodSample].elTagType">{{ two_history_blood_sample[scope.row.bloodSample].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="血样留存时间" prop="bloodSampleTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.bloodSampleTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="血样编码" prop="bloodSampleCode" show-overflow-tooltip/>
        <el-table-column label="尿液标本留存 0=否 1=是" prop="urineSample" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_urine_sample[scope.row.urineSample].elTagType">{{ two_history_urine_sample[scope.row.urineSample].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="尿液留存时间" prop="urineSampleTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.urineSampleTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尿液编码" prop="urineSampleCode" show-overflow-tooltip/>
        <el-table-column label="组织标本留存 0=否 1=是" prop="tissueSample" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_tissue_sample[scope.row.tissueSample].elTagType">{{ two_history_tissue_sample[scope.row.tissueSample].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="组织留存时间" prop="tissueSampleTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.tissueSampleTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织编码" prop="tissueSampleCode" show-overflow-tooltip/>
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
    <TwoSamplesDialog ref="twoSamplesDialogRef" @refresh="getTableData()" />
  </div>
</template>

<script setup lang="ts" name="twoSamples">
  import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useTwoSamplesApi } from '/@/api/two/samples';
  import { parseDateTime } from '/@/utils/formatTime';
  
  // 获取字典
  const { proxy } = getCurrentInstance();
  const { two_history_tissue_sample,two_history_blood_sample,two_history_urine_sample } = proxy.parseDict("two_history_tissue_sample","two_history_blood_sample","two_history_urine_sample");
  
  // 引入组件
  const TwoSamplesDialog = defineAsyncComponent(() => import('./dialog.vue'));

  // 定义变量内容
  const twoSamplesDialogRef = ref();
  const twoSamplesSearchRef = ref();
  const useTwoSamples = useTwoSamplesApi();
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
          bloodSample: '',
          bloodSampleTime: '',
          bloodSampleCode: '',
          urineSample: '',
          urineSampleTime: '',
          urineSampleCode: '',
          tissueSample: '',
          tissueSampleTime: '',
          tissueSampleCode: '',
        },
      },
    },
  });

  // 初始化表格数据
  const getTableData = () => {
    state.tableData.loading = true;
    useTwoSamples.getPageList(state.tableData.param).then(res => {
      state.tableData.records = res.records;
      state.tableData.total = res.total;
    });
    setTimeout(() => {
      state.tableData.loading = false;
    }, 500);
  };
  // 打开新增生物样本信息弹窗
  const onOpenAdd = (type: string) => {
    twoSamplesDialogRef.value.openDialog(type);
  };
  // 打开修改生物样本信息弹窗
  const onOpenEdit = (type: string, row) => {
    twoSamplesDialogRef.value.openDialog(type, row);
  };
  // 删除生物样本信息
  const onRowDel = (row) => {
    ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          useTwoSamples.deleteTwoSamples(row.id).then(() => {
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
        twoSamplesSearchRef.value.resetFields();
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
  .two-twoSamples-container {
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
