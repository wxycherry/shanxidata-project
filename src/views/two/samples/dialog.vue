<template>
  <div class="two-twoSamples-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="60%">
          <el-form ref="twoSamplesDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
            <el-row :gutter="35">

<!--              <el-col class="mb20">-->
<!--                <el-form-item label-width="150px" label="身份证号码" prop="patientId">-->
<!--                  <el-input v-model="state.ruleForm.patientId" placeholder="请输入身份证号码" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->

              <el-col class="mb20">
                <el-form-item label-width="150px" label="血样标本留存" prop="bloodSample">
                  <el-radio-group v-model="state.ruleForm.bloodSample">
                    <el-radio
                        v-for="dict in two_history_blood_sample"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.bloodSample === 1">
                <el-form-item label-width="150px" label="血样留存时间" prop="bloodSampleTime">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.bloodSampleTime"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择血样留存时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.bloodSample === 1">
                <el-form-item label-width="150px" label="血样编码" prop="bloodSampleCode">
                  <el-input v-model="state.ruleForm.bloodSampleCode" placeholder="请输入血样编码" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col class="mb20">
                <el-form-item label-width="150px" label="尿液标本留存" prop="urineSample">
                  <el-radio-group v-model="state.ruleForm.urineSample">
                    <el-radio
                        v-for="dict in two_history_urine_sample"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.urineSample === 1">
                <el-form-item label-width="150px" label="尿液留存时间" prop="urineSampleTime">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.urineSampleTime"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择尿液留存时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.urineSample === 1">
                <el-form-item label-width="150px" label="尿液编码" prop="urineSampleCode">
                  <el-input v-model="state.ruleForm.urineSampleCode" placeholder="请输入尿液编码" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col class="mb20">
                <el-form-item label-width="150px" label="组织标本留存" prop="tissueSample">
                  <el-radio-group v-model="state.ruleForm.tissueSample">
                    <el-radio
                        v-for="dict in two_history_tissue_sample"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.tissueSample === 1">
                <el-form-item label-width="150px" label="组织留存时间" prop="tissueSampleTime">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.tissueSampleTime"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择组织留存时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col class="mb20" v-if="state.ruleForm.tissueSample === 1">
                <el-form-item label-width="150px" label="组织编码" prop="tissueSampleCode">
                  <el-input v-model="state.ruleForm.tissueSampleCode" placeholder="请输入组织编码" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="default">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="dictDialog">
  import { defineAsyncComponent, nextTick, reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue';
  import { useTwoSamplesApi } from '/@/api/two/samples';
  import { ElMessage } from "element-plus";
  
  
  // 定义子组件向父组件传值/事件
  const emit = defineEmits(['refresh']);

  // 获取字典
  const { proxy } = getCurrentInstance();
  const { two_history_tissue_sample,two_history_blood_sample,two_history_urine_sample } = proxy.parseDict("two_history_tissue_sample","two_history_blood_sample","two_history_urine_sample");


  // 定义变量内容
  const useTwoSamples = useTwoSamplesApi();
  const twoSamplesDialogFormRef = ref();
  const state = reactive({
    ruleForm: {
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
    dialog: {
      isShowDialog: false,
      type: '',
      title: '',
      submitTxt: '',
    },
    rules: {
      patientId: { required: true, message: '请输入身份证号码', trigger: 'blur' },
    },
  });

  // 打开弹窗
  const openDialog = (type: string, row) => {
    resetForm();
    if (type === 'edit') {
      useTwoSamples.getTwoSamplesById(row.id).then(res => {
        state.ruleForm = res;
        state.dialog.title = '修改生物样本信息';
        state.dialog.submitTxt = '修 改';
      });
    } else {
      // 自动填充身份证ID
      state.ruleForm.patientId = row.patientId
      state.dialog.title = '新增生物样本信息';
      state.dialog.submitTxt = '新 增';
    }
    state.dialog.type = type;
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
      currentValidate(twoSamplesDialogFormRef),
    ]).then(res => {
      const validateResult = res.every(item => !!item);
      if (validateResult) {
        if(state.dialog.type == 'add'){
          useTwoSamples.createTwoSamples(state.ruleForm).then(() => {
            ElMessage.success('创建成功');
            closeDialog();
            emit('refresh');
          });
        } else {
          useTwoSamples.updateTwoSamples(state.ruleForm).then(() => {
            ElMessage.success('修改成功');
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


  
  const resetForm = () => {
    state.ruleForm = {
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
    }
  }
  // 暴露变量
  defineExpose({
    openDialog,
  });
</script>

