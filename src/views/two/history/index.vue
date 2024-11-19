<template>
  <div class="two-twoHistory-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoHistory-search">
        <el-form :inline="true" ref="twoHistorySearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="身份证号码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入身份证号码" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="高血压" class="ml20" prop="hypertension">
              <el-select v-model="state.tableData.param.query.hypertension" placeholder="请选择高血压" clearable>
                <el-option
                  v-for="dict in two_history_hypertension"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="高血压诊断日期" class="ml20" prop="hypertensionDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.hypertensionDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择高血压诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="糖尿病" class="ml20" prop="diabetes">
              <el-select v-model="state.tableData.param.query.diabetes" placeholder="请选择糖尿病" clearable>
                <el-option
                  v-for="dict in two_history_diabetes"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="糖尿病诊断日期" class="ml20" prop="diabetesDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.diabetesDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择糖尿病诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="高血脂" class="ml20" prop="hyperlipidemia">
              <el-select v-model="state.tableData.param.query.hyperlipidemia" placeholder="请选择高血脂" clearable>
                <el-option
                  v-for="dict in two_history_hyperlipidemia"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="高血脂诊断日期" class="ml20" prop="hyperlipidemiaDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.hyperlipidemiaDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择高血脂诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="脑血管疾病" class="ml20" prop="cerebrovascular">
              <el-select v-model="state.tableData.param.query.cerebrovascular" placeholder="请选择脑血管疾病" clearable>
                <el-option
                  v-for="dict in two_history_cerebrovascular"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="脑血管疾病诊断日期" class="ml20" prop="cerebrovascularDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.cerebrovascularDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择脑血管疾病诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="前列腺癌" class="ml20" prop="prostateCancer">
              <el-select v-model="state.tableData.param.query.prostateCancer" placeholder="请选择前列腺癌" clearable>
                <el-option
                  v-for="dict in two_history_prostate_cancer"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="前列腺癌诊断日期" class="ml20" prop="prostateCancerDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.prostateCancerDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择前列腺癌诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="前列腺增生手术史" class="ml20" prop="prostateSurgery">
              <el-select v-model="state.tableData.param.query.prostateSurgery" placeholder="请选择前列腺增生手术史" clearable>
                <el-option
                  v-for="dict in two_history_prostate_surgery"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="前列腺增生手术史诊断日期" class="ml20" prop="prostateSurgeryDate">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.prostateSurgeryDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择前列腺增生手术史诊断日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="家族癌史" class="ml20" prop="familyCancer">
              <el-select v-model="state.tableData.param.query.familyCancer" placeholder="请选择家族癌史" clearable>
                <el-option
                  v-for="dict in two_history_family_cancer"
                    :key="Number(dict.value)"
                    :label="dict.label"
                    :value="Number(dict.value)"
                />
              </el-select>
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
        <el-table-column label="高血压" prop="hypertension" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_hypertension[scope.row.hypertension].elTagType">{{ two_history_hypertension[scope.row.hypertension].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="高血压诊断日期" prop="hypertensionDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.hypertensionDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="糖尿病" prop="diabetes" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_diabetes[scope.row.diabetes].elTagType">{{ two_history_diabetes[scope.row.diabetes].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="糖尿病诊断日期" prop="diabetesDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.diabetesDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="高血脂" prop="hyperlipidemia" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_hyperlipidemia[scope.row.hyperlipidemia].elTagType">{{ two_history_hyperlipidemia[scope.row.hyperlipidemia].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="高血脂诊断日期" prop="hyperlipidemiaDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.hyperlipidemiaDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="脑血管疾病" prop="cerebrovascular" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_cerebrovascular[scope.row.cerebrovascular].elTagType">{{ two_history_cerebrovascular[scope.row.cerebrovascular].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="脑血管疾病诊断日期" prop="cerebrovascularDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.cerebrovascularDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="前列腺癌" prop="prostateCancer" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_prostate_cancer[scope.row.prostateCancer].elTagType">{{ two_history_prostate_cancer[scope.row.prostateCancer].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="前列腺癌诊断日期" prop="prostateCancerDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.prostateCancerDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="前列腺增生手术史" prop="prostateSurgery" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_prostate_surgery[scope.row.prostateSurgery].elTagType">{{ two_history_prostate_surgery[scope.row.prostateSurgery].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="前列腺增生手术史诊断日期" prop="prostateSurgeryDate" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.prostateSurgeryDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="前列腺增生用药" prop="prostateMedication" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_prostate_medication[scope.row.prostateMedication].elTagType">{{ two_history_prostate_medication[scope.row.prostateMedication].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="其他药物" prop="otherMeds" show-overflow-tooltip/>
        <el-table-column label="家族癌史" prop="familyCancer" show-overflow-tooltip>
          <template #default="scope">
            <el-tag :type="two_history_family_cancer[scope.row.familyCancer].elTagType">{{ two_history_family_cancer[scope.row.familyCancer].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="患癌成员" prop="familyMembers" show-overflow-tooltip/>
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
    <TwoHistoryDialog ref="twoHistoryDialogRef" @refresh="getTableData()" />
  </div>
</template>

<script setup lang="ts" name="twoHistory">
  import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useTwoHistoryApi } from '/@/api/two/history';
  import { parseDateTime } from '/@/utils/formatTime';
  
  // 获取字典
  const { proxy } = getCurrentInstance();
  const { two_history_hypertension,two_history_cerebrovascular,two_history_prostate_cancer,two_history_prostate_medication,two_history_family_cancer,two_history_diabetes,two_history_hyperlipidemia,two_history_prostate_surgery } = proxy.parseDict("two_history_hypertension","two_history_cerebrovascular","two_history_prostate_cancer","two_history_prostate_medication","two_history_family_cancer","two_history_diabetes","two_history_hyperlipidemia","two_history_prostate_surgery");
  
  // 引入组件
  const TwoHistoryDialog = defineAsyncComponent(() => import('./dialog.vue'));

  // 定义变量内容
  const twoHistoryDialogRef = ref();
  const twoHistorySearchRef = ref();
  const useTwoHistory = useTwoHistoryApi();
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
          hypertension: '',
          hypertensionDate: '',
          diabetes: '',
          diabetesDate: '',
          hyperlipidemia: '',
          hyperlipidemiaDate: '',
          cerebrovascular: '',
          cerebrovascularDate: '',
          prostateCancer: '',
          prostateCancerDate: '',
          prostateSurgery: '',
          prostateSurgeryDate: '',
          prostateMedication: '',
          otherMeds: '',
          familyCancer: '',
          familyMembers: '',
        },
      },
    },
  });

  // 初始化表格数据
  const getTableData = () => {
    state.tableData.loading = true;
    useTwoHistory.getPageList(state.tableData.param).then(res => {
      state.tableData.records = res.records;
      state.tableData.total = res.total;
    });
    setTimeout(() => {
      state.tableData.loading = false;
    }, 500);
  };
  // 打开新增既往病史信息弹窗
  const onOpenAdd = (type: string) => {
    twoHistoryDialogRef.value.openDialog(type);
  };
  // 打开修改既往病史信息弹窗
  const onOpenEdit = (type: string, row) => {
    twoHistoryDialogRef.value.openDialog(type, row);
  };
  // 删除既往病史信息
  const onRowDel = (row) => {
    ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          useTwoHistory.deleteTwoHistory(row.id).then(() => {
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
        twoHistorySearchRef.value.resetFields();
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
    .two-twoHistory-container {
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
