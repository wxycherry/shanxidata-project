<template>
  <div v-if="state.dialog.isShowDialog">
    <el-form ref="twoGeneralDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default"
             label-width="100px">
      <el-form-item>
      </el-form-item>
      <el-row :gutter="35">

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
          <el-form-item label="身份证号码" prop="patientId">
            <el-input v-model="state.ruleForm.patientId" placeholder="请输入身份证号码" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="state.ruleForm.name" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="state.ruleForm.age" placeholder="请输入年龄" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="dictDialog">
import {reactive, ref, defineEmits} from 'vue';
import {useTwoGeneralApi} from '/@/api/two/general';
import {ElMessage} from "element-plus";


// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);


// 定义变量内容
const useTwoGeneral = useTwoGeneralApi();
const twoGeneralDialogFormRef = ref();
const state = reactive({
  ruleForm: {
    patientId: '',
    name: '',
    age: '',
  },
  rules: {
    patientId: {required: true, message: '请输入身份证号码', trigger: 'blur'},
    name: {required: true, message: '请输入姓名', trigger: 'blur'},
    age: {required: true, message: '请输入年龄', trigger: 'blur'},
  },
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
});

// 打开弹窗
const openDialog = (type: string, id:any) => {
  resetForm();
  if (type === 'edit') {
    useTwoGeneral.getTwoGeneralById(id).then((res:any) => {
      state.ruleForm = res;      
    });
  }
  state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
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
    currentValidate(twoGeneralDialogFormRef),
  ]).then(res => {
    const validateResult = res.every(item => !!item);
    if (validateResult) {
      if (state.dialog.type == 'add') {
        useTwoGeneral.createTwoGeneral(state.ruleForm).then(() => {
          // ElMessage.success('创建成功');
          closeDialog();
          emit('refresh');
        });
      } else {
        useTwoGeneral.updateTwoGeneral(state.ruleForm).then(() => {
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
const currentValidate = (pageRef:any) => {
  return new Promise((resolve) => {
    pageRef.value.validate((valid: boolean) => {
      if (valid) resolve(valid);
    });
  });
};


const resetForm = () => {
  state.ruleForm = {
    patientId: '',
    name: '',
    age: '',
  }
}
// 暴露变量
defineExpose({
  openDialog,onSubmit
});
</script>

