<template>
    <div v-if="state.dialog.isShowDialog">
      <el-form ref="twoPsacheckupDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
        <el-row :gutter="35">
          <!-- JSON数据转化 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
            <el-form-item label-width="200px" label="PSA检验结果" prop="psa" class="inline-form-item">
              <DateResultPicker :dataString="state.ruleForm.psa" @update:dataString="handleDataUpdate('psa', $event)"/>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
            <el-form-item label-width="200px" label="fPSA检验结果" prop="fPsa" class="inline-form-item">
              <DateResultPicker :dataString="state.ruleForm.fpsa" @update:dataString="handleDataUpdate('fpsa', $event)"/>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
            <el-form-item label-width="200px" label="PAP检测结果" prop="pap" class="inline-form-item">
              <DateResultPicker :dataString="state.ruleForm.pap" @update:dataString="handleDataUpdate('pap', $event)"/>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
            <el-form-item label-width="200px" label="PHI检验结果" prop="phi" class="inline-form-item">
              <DateResultPicker :dataString="state.ruleForm.phi" @update:dataString="handleDataUpdate('phi', $event)"/>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
            <el-form-item label-width="200px" label="-2proPSA检验结果" prop="proPsa" class="inline-form-item">
              <DateResultPicker :dataString="state.ruleForm.proPsa" @update:dataString="handleDataUpdate('proPsa', $event)"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script setup lang="ts" name="dictDialog">
import { defineAsyncComponent, nextTick, reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue';
import { useTwoPsacheckupApi } from '/@/api/two/psacheckup';
import { ElMessage } from "element-plus";
import DateResultPicker from '../checkupelse/DateResultPicker.vue';


// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);


// 定义变量内容
const useTwoPsacheckup = useTwoPsacheckupApi();
const twoPsacheckupDialogFormRef = ref();
const state = reactive({
  ruleForm: {
    patientId: '',
    psa: '',
    fpsa: '',
    pap: '',
    phi: '',
    proPsa: '',
  },
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
  rules: {
    patientId: { required: true, message: '请输入身份证号码', trigger: 'blur' },
  },
  loadingData: false
});

// 打开弹窗
const openDialog = (type: string, row:any) => {
  resetForm();
  if (type === 'edit') {  
    state.ruleForm = row
    state.dialog.title = '修改社区检测结果信息（PSA）';
    state.dialog.submitTxt = '修 改';
    state.loadingData = true;
    state.dialog.isShowDialog = true;
  } else {
    state.ruleForm.patientId = row.patientId
    state.dialog.title = '新增社区检测结果信息（PSA）';
    state.dialog.submitTxt = '新 增';
    state.loadingData = true;
    state.dialog.isShowDialog = true;
  }
  state.dialog.type = type;
  // console.log(state.ruleForm.psa);
};
// 关闭弹窗
const closeDialog = () => {
  state.loadingData = false;
  state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};

// 提交
const onSubmit = () => {
  // 验证表单
  Promise.all([
    currentValidate(twoPsacheckupDialogFormRef),
  ]).then(res => {
    const validateResult = res.every(item => !!item);
    if (validateResult) {
      if(state.dialog.type == 'add'){
        useTwoPsacheckup.createTwoPsacheckup(state.ruleForm).then(() => {
          // ElMessage.success('创建成功');
          closeDialog();
          emit('refresh');
        });
      } else {
        useTwoPsacheckup.updateTwoPsacheckup(state.ruleForm).then(() => {
          // ElMessage.success('修改成功');
          closeDialog();
          emit('refresh');
        });
      }
    } else {
      ElMessage.error("表单校验未通过，请重新检查提交内容");
    }
  });
};

// 主表-表单组件验证
const currentValidate = (pageRef) => {
  return new Promise((resolve) => {
    pageRef.value.validate((valid: boolean) => {
      if (valid) resolve(valid);
    });
  });
};

const handleDataUpdate = (propertyName: string, newDataString: string) => {
  state.ruleForm[propertyName] = newDataString; // 同时更新dataString，以便下次传入子组件
}

const resetForm = () => {
  state.ruleForm = {
    patientId: '',
    psa: '',
    fpsa: '',
    pap: '',
    phi: '',
    proPsa: '',
  }
}
// 暴露变量
defineExpose({
  openDialog, onSubmit
});
</script>

