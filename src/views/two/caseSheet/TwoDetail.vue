<template>
  <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="90%">
    <el-collapse v-model="state.activeNames">
      <el-collapse-item title="基本情况" name="1">
        <template #title>
          <span class="title">基本情况</span>
          <el-button type="primary" size="middle" @click.stop="onReset('1')">重置</el-button>
        </template>
        <GeneralDetail ref="twoGeneralDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="既往史" name="2">
        <template #title>
          <span class="title">既往史</span>
          <el-button type="primary" size="middle" @click.stop="onReset('2')">重置</el-button>
        </template>
        <HistoryDetail ref="twoHistoryDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="症状评分" name="3">
        <template #title>
          <span class="title">症状评分</span>
          <el-button type="primary" size="middle" @click.stop="onReset('3')">重置</el-button>
        </template>
        <SymptomsDetail ref="twoSymptomsDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="生物样本" name="4">
        <template #title>
          <span class="title">生物样本</span>
          <el-button type="primary" size="middle" @click.stop="onReset('4')">重置</el-button>
        </template>
        <SamplesDetail ref="twoSamplesDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="其他指标检查结果" name="5">
        <template #title>
          <span class="title">其他指标检查结果</span>
          <el-button type="primary" size="middle" @click.stop="onReset('5')">重置</el-button>
        </template>
        <PsaCheckupDetail ref="twoPsaCheckupDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="社区检查结果" name="6">
        <template #title>
          <span class="title">社区检查结果</span>
          <el-button type="primary" size="middle" @click.stop="onReset('6')">重置</el-button>
        </template>
        <CheckupelseDetail ref="twoCheckupelseDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
      <el-collapse-item title="进一步检查情况" name="7">
        <template #title>
          <span class="title">进一步检查情况</span>
          <el-button type="primary" size="middle" @click.stop="onReset('7')">重置</el-button>
        </template>
        <TestResultDetail ref="twoTestResultDialogRef" @refresh="onRefresh"/>
      </el-collapse-item>
    </el-collapse>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="default">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
        </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>

import {defineAsyncComponent, reactive, ref, nextTick} from 'vue';
import {useTwoTestResultApi} from "/@/api/two/testResult";
import {useTwoSymptomsApi} from "/@/api/two/symptoms";
import {useTwoHistoryApi} from "/@/api/two/history";
import {useTwoGeneralApi} from "/@/api/two/general";
import {ElMessage, ElMessageBox } from 'element-plus';
import {useTwoSamplesApi} from "/@/api/two/samples";
import {useTwoCheckupelseApi } from '/@/api/two/checkupelse';
import {useTwoPsacheckupApi} from "/@/api/two/psacheckup";
// 引入组件
import GeneralDetail from './GeneralDetail.vue';
import HistoryDetail from './HistoryDetail.vue';
import SamplesDetail from './SamplesDetail.vue';
import SymptomsDetail from './SymptomsDetail.vue';
import PsaCheckupDetail from './PsaCheckupDetail.vue';
import TestResultDetail from './TestResultDetail.vue';
import CheckupelseDetail from './CheckupElseDetail.vue';
/**异步组件导致第一次加载时不载入 */
// const GeneralDetail = defineAsyncComponent(() => import('./GeneralDetail.vue'))
// const HistoryDetail = defineAsyncComponent(() => import('./HistoryDetail.vue'))
// const SamplesDetail = defineAsyncComponent(() => import('./SamplesDetail.vue'))
// const SymptomsDetail = defineAsyncComponent(() => import('./SymptomsDetail.vue'))
// const PsaCheckupDetail = defineAsyncComponent(() => import('./PsaCheckupDetail.vue'))
// const TestResultDetail = defineAsyncComponent(() => import('./TestResultDetail.vue'))
// const CheckupelseDetail = defineAsyncComponent(() => import('./CheckupElseDetail.vue'))

// 定义ref变量
const twoGeneralDialogRef = ref();
const twoHistoryDialogRef = ref();
const twoSamplesDialogRef = ref();
const twoSymptomsDialogRef = ref();
const twoPsaCheckupDialogRef = ref();
const twoTestResultDialogRef = ref();
const twoCheckupelseDialogRef = ref();

// 定义API
const useTwoPsaCheckUp = useTwoPsacheckupApi();
const useTwoCheckUpelse = useTwoCheckupelseApi();

const state = reactive({
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
  activeNames: ['1', '2', '3', '4', '5', '6', '7']
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const currentPatientId = ref()
const currentRowId = ref()
const currentPatientParam = ref();

// 打开弹窗
const openDialog = async (type:any, row:any) => {
  resetForm();
  //解决第一次打开数据不渲染
  state.dialog.isShowDialog = true;
  await nextTick()
  state.dialog.type = type;
  if (type === 'edit') {
    state.dialog.title = '修改病历单详情';
    state.dialog.submitTxt = '修 改';
    currentPatientId.value = row.patientId;
    currentRowId.value = row.id
    currentPatientParam.value = {
      page: {
        current: 1,
        size: 1,
      },
      query: {
        patientId: currentPatientId.value,
      },
    };    
    // 1.twoGeneralDialogRef
    openTwoGeneralDialog(type, currentRowId.value);
    // 2.twoHistoryDialogRef
    openTwoHistoryDialog();
    //3.twoSymptomsDialogRef
    openTwoSymptomsDialog()
    //4.twoSamplesDialogRef
    openTwoSamplesDialog();
    // 5.twoPsaCheckupDialogRef
    openTwoPsaCheckupDialog();
    // 6.twoCheckupElseDialogRef
    openTwoCheckupelseDialog();
    // 7.twoTestResultDialogRef
    openTwoTestResultDialog();
  } else {
    state.dialog.title = '新增病历单详情';
    state.dialog.submitTxt = '新 增';
  }
};
const openTwoGeneralDialog = (type:any,id:any) =>{
  if (twoGeneralDialogRef.value) {
    twoGeneralDialogRef.value.openDialog(type, id);
  }
}
const openTwoHistoryDialog = async () =>{
  if (twoHistoryDialogRef.value) {
    const {records} = await useTwoHistoryApi().getPageList(currentPatientParam.value);
    if (records.length > 1) {
      ElMessage.error('数据冗余异常');
      return;
    }
    const type: String = records.length == 1 ? 'edit' : 'add';
    twoHistoryDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
  }
}
const openTwoSymptomsDialog = async () =>{
  //3.twoSymptomsDialogRef
  if (twoSymptomsDialogRef.value) {
    const {records} = await useTwoSymptomsApi().getPageList(currentPatientParam.value);
    if (records.length > 1) {
      ElMessage.error('数据冗余异常');
      return;
    }
    const type: String = records.length == 1 ? 'edit' : 'add';
    twoSymptomsDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
  }
}
const openTwoSamplesDialog = async () =>{
  if (twoSamplesDialogRef.value) {
    const {records} = await useTwoSamplesApi().getPageList(currentPatientParam.value);
    if (records.length > 1) {
      ElMessage.error('数据冗余异常');
      return;
    }
    const type: String = records.length == 1 ? 'edit' : 'add';
    twoSamplesDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
  }
}
const openTwoPsaCheckupDialog = async () => {  
  if (twoPsaCheckupDialogRef.value) {
      const {records} = await useTwoPsaCheckUp.getPageList(currentPatientParam.value);
      if (records.length > 1) {
        ElMessage.error('数据冗余异常');
        return;
      }
      const type: String = records.length == 1 ? 'edit' : 'add';      
      twoPsaCheckupDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
    }
}
const openTwoCheckupelseDialog = async () =>{
  if (twoCheckupelseDialogRef.value) {
      const {records} = await useTwoCheckUpelse.getPageList(currentPatientParam.value);
      if (records.length > 1) {
        ElMessage.error('数据冗余异常');
        return;
      }
      const type: String = records.length == 1 ? 'edit' : 'add';
      twoCheckupelseDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
  }
}
const openTwoTestResultDialog = async () =>{
  if (twoTestResultDialogRef.value) {
      const {records} = await useTwoTestResultApi().getPageList(currentPatientParam.value);
      if (records.length > 1) {
        ElMessage.error('数据冗余异常');
        return;
      }
      const type: String = records.length == 1 ? 'edit' : 'add';
      twoTestResultDialogRef.value.openDialog(type, records[0] || {patientId: currentPatientId.value});
  }
}

// 关闭弹窗
const closeDialog = () => {
  state.dialog.isShowDialog = false;
  resetForm()
};
// 取消
const onCancel = () => {
  closeDialog();
};
const onReset = (name:string) => {
  switch (name) {
    case "1":
      openTwoGeneralDialog('edit', currentRowId.value);
      break;
    case "2":
      openTwoHistoryDialog();
       break;
    case "3":
      openTwoSymptomsDialog()
       break;
    case "4":
      openTwoSamplesDialog();
       break;
    case "5":
      openTwoPsaCheckupDialog();
       break;
    case "6":
      openTwoCheckupelseDialog();
       break;
    case "7":
      openTwoTestResultDialog();
       break;
  }
}

// 提交
const onSubmit = () => {
  ElMessageBox.confirm(
    '是否要修改病历单?',
    '提醒',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      twoGeneralDialogRef.value.onSubmit();
      twoHistoryDialogRef.value.onSubmit();
      twoSamplesDialogRef.value.onSubmit();
      twoSymptomsDialogRef.value.onSubmit();
      twoPsaCheckupDialogRef.value.onSubmit();
      twoTestResultDialogRef.value.onSubmit();
      twoCheckupelseDialogRef.value.onSubmit();
      ElMessage.success('修改成功');
      closeDialog();
    })
    .catch(() => {
      ElMessage.info("修改失败")
      closeDialog();
    })
};
const onRefresh = () => {
  console.log("刷新了");
  emit('refresh');
}

const resetForm = () => {
  state.activeNames = ['1', '2', '3', '4', '5', '6', '7']
}
// 暴露变量
defineExpose({
  openDialog,
});

</script>
<style scoped lang="scss">
.title{
  width: 79vw;
  text-align: left;
}
</style>