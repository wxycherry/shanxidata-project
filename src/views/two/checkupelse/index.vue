<template>
  <div class="two-twoCheckupelse-container layout-padding">
    <el-card shadow="hover" class="layout-padding-auto">
      <div class="two-twoCheckupelse-search">
        <el-form :inline="true" ref="twoCheckupelseSearchRef" :model="state.tableData.param.query" size="default">
          <el-row>
            <el-form-item label="体检时间" class="ml20" prop="checkupTime">
              <el-date-picker clearable
                              v-model="state.tableData.param.query.checkupTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择体检时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="总胆固醇" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.chol" placeholder="请输入总胆固醇" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="高密度脂蛋白胆固醇" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.hdl" placeholder="请输入高密度脂蛋白胆固醇" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="低密度脂蛋白胆固醇" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.ldl" placeholder="请输入低密度脂蛋白胆固醇" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="丙氨酸氨基转移酶" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.alt" placeholder="请输入丙氨酸氨基转移酶" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="天门冬氨酸氨基转移酶" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.ast" placeholder="请输入天门冬氨酸氨基转移酶" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="尿素" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.urea" placeholder="请输入尿素" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="肌酐" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.creatinine" placeholder="请输入肌酐" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="尿酸" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.uricAcid" placeholder="请输入尿酸" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="甘油三酯" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.triglycerides" placeholder="请输入甘油三酯" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="同型半胱氨酸" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.homocysteine" placeholder="请输入同型半胱氨酸" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="总胆红素" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.bilirubin" placeholder="请输入总胆红素" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="红细胞计数" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.rbcCount" placeholder="请输入红细胞计数" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="血红蛋白" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.hgb" placeholder="请输入血红蛋白" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="红细胞压积" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.hematocrit" placeholder="请输入红细胞压积" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="血小板计数" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.plateletCount" placeholder="请输入血小板计数" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="白细胞计数" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.wbcCount" placeholder="请输入白细胞计数" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="中性粒细胞比率" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.neutrophilRatio" placeholder="请输入中性粒细胞比率" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="腹部B超结果" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.ultrasound" placeholder="请输入腹部B超结果" clearable
                      style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.patientId" placeholder="请输入身份证号码" clearable
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
        <el-table-column label="体检时间" prop="checkupTime" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.checkupTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总胆固醇" prop="chol" show-overflow-tooltip/>
        <el-table-column label="高密度脂蛋白胆固醇" prop="hdl" show-overflow-tooltip/>
        <el-table-column label="低密度脂蛋白胆固醇" prop="ldl" show-overflow-tooltip/>
        <el-table-column label="丙氨酸氨基转移酶" prop="alt" show-overflow-tooltip/>
        <el-table-column label="天门冬氨酸氨基转移酶" prop="ast" show-overflow-tooltip/>
        <el-table-column label="尿素" prop="urea" show-overflow-tooltip/>
        <el-table-column label="肌酐" prop="creatinine" show-overflow-tooltip/>
        <el-table-column label="尿酸" prop="uricAcid" show-overflow-tooltip/>
        <el-table-column label="甘油三酯" prop="triglycerides" show-overflow-tooltip/>
        <el-table-column label="同型半胱氨酸" prop="homocysteine" show-overflow-tooltip/>
        <el-table-column label="总胆红素" prop="bilirubin" show-overflow-tooltip/>
        <el-table-column label="红细胞计数" prop="rbcCount" show-overflow-tooltip/>
        <el-table-column label="血红蛋白" prop="hgb" show-overflow-tooltip/>
        <el-table-column label="红细胞压积" prop="hematocrit" show-overflow-tooltip/>
        <el-table-column label="血小板计数" prop="plateletCount" show-overflow-tooltip/>
        <el-table-column label="白细胞计数" prop="wbcCount" show-overflow-tooltip/>
        <el-table-column label="中性粒细胞比率" prop="neutrophilRatio" show-overflow-tooltip/>
        <el-table-column label="腹部B超结果" prop="ultrasound" show-overflow-tooltip/>
        <el-table-column label="异常情况" prop="abnormalities" show-overflow-tooltip/>
        <el-table-column label="身份证号码" prop="patientId" show-overflow-tooltip/>
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
    <TwoCheckupelseDialog ref="twoCheckupelseDialogRef" @refresh="getTableData()" />
  </div>
</template>

<script setup lang="ts" name="twoCheckupelse">
  import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useTwoCheckupelseApi } from '/@/api/two/checkupelse';
  import { parseDateTime } from '/@/utils/formatTime';
  
  // 引入组件
  const TwoCheckupelseDialog = defineAsyncComponent(() => import('./dialog.vue'));

  // 定义变量内容
  const twoCheckupelseDialogRef = ref();
  const twoCheckupelseSearchRef = ref();
  const useTwoCheckupelse = useTwoCheckupelseApi();
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
          checkupTime: '',
          chol: '',
          hdl: '',
          ldl: '',
          alt: '',
          ast: '',
          urea: '',
          creatinine: '',
          uricAcid: '',
          triglycerides: '',
          homocysteine: '',
          bilirubin: '',
          rbcCount: '',
          hgb: '',
          hematocrit: '',
          plateletCount: '',
          wbcCount: '',
          neutrophilRatio: '',
          ultrasound: '',
          abnormalities: '',
          patientId: '',
        },
      },
    },
  });

  // 初始化表格数据
  const getTableData = () => {
    state.tableData.loading = true;
    useTwoCheckupelse.getPageList(state.tableData.param).then(res => {
      state.tableData.records = res.records;
      state.tableData.total = res.total;
    });
    setTimeout(() => {
      state.tableData.loading = false;
    }, 500);
  };
  // 打开新增社区检测结果信息弹窗
  const onOpenAdd = (type: string) => {
    twoCheckupelseDialogRef.value.openDialog(type);
  };
  // 打开修改社区检测结果信息弹窗
  const onOpenEdit = (type: string, row) => {
    twoCheckupelseDialogRef.value.openDialog(type, row);
  };
  // 删除社区检测结果信息
  const onRowDel = (row) => {
    ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
        .then(() => {
          useTwoCheckupelse.deleteTwoCheckupelse(row.id).then(() => {
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
        twoCheckupelseSearchRef.value.resetFields();
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
  .two-twoCheckupelse-container {
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
