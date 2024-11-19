<template>
  <div class="two-twoTestResult-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="60%">
          <el-form ref="twoTestResultDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
            <el-row :gutter="35">

<!--              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">-->
<!--                <el-form-item label-width="200px" label="患者身份证号" prop="patientId">-->
<!--                  <el-input v-model="state.ruleForm.patientId" placeholder="请输入患者身份证号" clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="是否进行核磁共振检查" prop="mriPerformed">
                  <el-radio-group v-model="state.ruleForm.mriPerformed">
                    <el-radio
                        v-for="dict in two_history_mri_performed"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="核磁共振检查日期" prop="mriDate">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.mriDate"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择核磁共振检查日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="前列腺长度(cm)" prop="prostateLength">
                  <el-input v-model="state.ruleForm.prostateLength" placeholder="请输入前列腺长度(cm)" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="前列腺宽度(cm)" prop="prostateWidth">
                  <el-input v-model="state.ruleForm.prostateWidth" placeholder="请输入前列腺宽度(cm)" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="前列腺高度(cm)" prop="prostateHeight">
                  <el-input v-model="state.ruleForm.prostateHeight" placeholder="请输入前列腺高度(cm)" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="前列腺体积(ml)" prop="prostateVolume">
                  <el-input v-model="state.ruleForm.prostateVolume" placeholder="请输入前列腺体积(ml)" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="核磁共振结果是否异常" prop="mriAbnormality">
                  <el-radio-group v-model="state.ruleForm.mriAbnormality">
                    <el-radio
                        v-for="dict in two_history_mri_abnormality"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="病灶位置" prop="tumorLocation">
                  <el-radio-group v-model="state.ruleForm.tumorLocation">
                    <el-radio
                        v-for="dict in two_history_tumor_location"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.mriPerformed === 1">
                <el-form-item label-width="200px" label="PI-RADS评分" prop="piRadsScore">
                  <el-input v-model="state.ruleForm.piRadsScore" placeholder="请输入PI-RADS评分" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="是否进行穿刺" prop="biopsyPerformed">
                  <el-radio-group v-model="state.ruleForm.biopsyPerformed">
                    <el-radio
                        v-for="dict in two_history_biopsy_performed"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.biopsyPerformed === 1">
                <el-form-item label-width="200px" label="穿刺日期" prop="biopsyDate">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.biopsyDate"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择穿刺日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.biopsyPerformed === 1">
                <el-form-item label-width="200px" label="穿刺结果" prop="biopsyResult">
                  <el-radio-group v-model="state.ruleForm.biopsyResult">
                    <el-radio
                        v-for="dict in two_history_biopsy_result"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.biopsyResult === 3">
                <el-form-item label-width="200px" label="其他穿刺结果" prop="biopsyOtherResult">
                  <el-input v-model="state.ruleForm.biopsyOtherResult" placeholder="请输入其他穿刺结果" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="Gleason主要评分" prop="gleasonPrimary">
                  <el-input v-model="state.ruleForm.gleasonPrimary" placeholder="请输入Gleason主要评分" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="Gleason次要评分" prop="gleasonSecondary">
                  <el-input v-model="state.ruleForm.gleasonSecondary" placeholder="请输入Gleason次要评分" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="Gleason总评分" prop="gleasonTotal">
                  <el-input v-model="state.ruleForm.gleasonTotal" placeholder="请输入Gleason总评分" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="临床分期T" prop="clinicalStageT">
                  <el-radio-group v-model="state.ruleForm.clinicalStageT">
                    <el-radio
                        v-for="dict in two_history_clinical_stage_t"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="临床分期N" prop="clinicalStageN">
                  <el-radio-group v-model="state.ruleForm.clinicalStageN">
                    <el-radio
                        v-for="dict in two_history_clinical_stage_n"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="临床分期M" prop="clinicalStageM">
                  <el-radio-group v-model="state.ruleForm.clinicalStageM">
                    <el-radio
                        v-for="dict in two_history_clinical_stage_m"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="前列腺癌分类" prop="cancerClassification">
                  <el-radio-group v-model="state.ruleForm.cancerClassification">
                    <el-radio
                        v-for="dict in two_history_cancer_classification"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="ISUP分级" prop="isupGrade">
                  <el-radio-group v-model="state.ruleForm.isupGrade">
                    <el-radio
                        v-for="dict in two_history_isup_grade"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="后续治疗方案" prop="treatmentPlan">
                  <el-radio-group v-model="state.ruleForm.treatmentPlan">
                    <el-radio
                        v-for="dict in two_history_treatment_plan"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.treatmentPlan === 6">
                <el-form-item label-width="200px" label="其他后续治疗方案" prop="treatmentOtherPlan">
                  <el-input v-model="state.ruleForm.treatmentOtherPlan" placeholder="请输入其他后续治疗方案" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="BPH药物治疗" prop="bphMedication">
                  <el-radio-group v-model="state.ruleForm.bphMedication">
                    <el-radio
                        v-for="dict in two_history_bph_medication"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.bphMedication === 5">
                <el-form-item label-width="200px" label="其他BPH药物治疗" prop="bphOtherMedication">
                  <el-input v-model="state.ruleForm.bphOtherMedication" placeholder="请输入其他BPH药物治疗" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label-width="200px" label="BPH是否手术治疗" prop="bphSurgeryPerformed">
                  <el-radio-group v-model="state.ruleForm.bphSurgeryPerformed">
                    <el-radio
                        v-for="dict in two_history_bph_surgery_performed"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.bphSurgeryPerformed === 1">
                <el-form-item label-width="200px" label="BPH手术时间" prop="bphSurgeryDate">
                  <el-date-picker clearable
                                  v-model="state.ruleForm.bphSurgeryDate"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="选择BPH手术时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.bphSurgeryPerformed === 1">
                <el-form-item label-width="200px" label="BPH手术治疗方式" prop="bphSurgeryType">
                  <el-radio-group v-model="state.ruleForm.bphSurgeryType">
                    <el-radio
                        v-for="dict in two_history_bph_surgery_type"
                        :label="Number(dict.value)"
                    >{{ dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.bphSurgeryType === 6">
                <el-form-item label-width="200px" label="BPH手术治疗其他方式" prop="bphSurgeryOtherType">
                  <el-input v-model="state.ruleForm.bphSurgeryOtherType" placeholder="请输入BPH手术治疗其他方式" clearable>
                  </el-input>
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
  import { useTwoTestResultApi } from '/@/api/two/testResult';
  import { ElMessage } from "element-plus";
  
  
  // 定义子组件向父组件传值/事件
  const emit = defineEmits(['refresh']);

  // 获取字典
  const { proxy } = getCurrentInstance();
  const { two_history_mri_performed,two_history_mri_abnormality,two_history_clinical_stage_t,two_history_cancer_classification,two_history_bph_surgery_performed,two_history_isup_grade,two_history_treatment_plan,two_history_biopsy_result,two_history_biopsy_performed,two_history_tumor_location,two_history_bph_medication,two_history_clinical_stage_m,two_history_clinical_stage_n,two_history_bph_surgery_type } = proxy.parseDict("two_history_mri_performed","two_history_mri_abnormality","two_history_clinical_stage_t","two_history_cancer_classification","two_history_bph_surgery_performed","two_history_isup_grade","two_history_treatment_plan","two_history_biopsy_result","two_history_biopsy_performed","two_history_tumor_location","two_history_bph_medication","two_history_clinical_stage_m","two_history_clinical_stage_n","two_history_bph_surgery_type");


  // 定义变量内容
  const useTwoTestResult = useTwoTestResultApi();
  const twoTestResultDialogFormRef = ref();
  const state = reactive({
    ruleForm: {
      patientId: '',
      mriPerformed: '',
      mriDate: '',
      prostateLength: '',
      prostateWidth: '',
      prostateHeight: '',
      prostateVolume: '',
      mriAbnormality: '',
      tumorLocation: '',
      piRadsScore: '',
      biopsyPerformed: '',
      biopsyDate: '',
      biopsyResult: '',
      biopsyOtherResult: '',
      gleasonPrimary: '',
      gleasonSecondary: '',
      gleasonTotal: '',
      clinicalStageT: '',
      clinicalStageN: '',
      clinicalStageM: '',
      cancerClassification: '',
      isupGrade: '',
      treatmentPlan: '',
      treatmentOtherPlan: '',
      bphMedication: '',
      bphOtherMedication: '',
      bphSurgeryPerformed: '',
      bphSurgeryDate: '',
      bphSurgeryType: '',
      bphSurgeryOtherType: '',
    },
    dialog: {
      isShowDialog: false,
      type: '',
      title: '',
      submitTxt: '',
    },
    rules: {
      patientId: { required: true, message: '请输入患者身份证号', trigger: 'blur' },
    },
  });

  // 打开弹窗
  const openDialog = (type: string, row) => {
    resetForm();
    if (type === 'edit') {
      useTwoTestResult.getTwoTestResultById(row.id).then(res => {
        state.ruleForm = res;
        state.dialog.title = '修改山西省智能数据辅助诊疗工程研究中心检测结果';
        state.dialog.submitTxt = '修 改';
      });
    } else {
      // 自动填充身份证ID
      state.ruleForm.patientId = row.patientId
      state.dialog.title = '新增山西省智能数据辅助诊疗工程研究中心检测结果';
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
      currentValidate(twoTestResultDialogFormRef),
    ]).then(res => {
      const validateResult = res.every(item => !!item);
      if (validateResult) {
        if(state.dialog.type == 'add'){
          useTwoTestResult.createTwoTestResult(state.ruleForm).then(() => {
            ElMessage.success('创建成功');
            closeDialog();
            emit('refresh');
          });
        } else {
          useTwoTestResult.updateTwoTestResult(state.ruleForm).then(() => {
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
      mriPerformed: '',
      mriDate: '',
      prostateLength: '',
      prostateWidth: '',
      prostateHeight: '',
      prostateVolume: '',
      mriAbnormality: '',
      tumorLocation: '',
      piRadsScore: '',
      biopsyPerformed: '',
      biopsyDate: '',
      biopsyResult: '',
      biopsyOtherResult: '',
      gleasonPrimary: '',
      gleasonSecondary: '',
      gleasonTotal: '',
      clinicalStageT: '',
      clinicalStageN: '',
      clinicalStageM: '',
      cancerClassification: '',
      isupGrade: '',
      treatmentPlan: '',
      treatmentOtherPlan: '',
      bphMedication: '',
      bphOtherMedication: '',
      bphSurgeryPerformed: '',
      bphSurgeryDate: '',
      bphSurgeryType: '',
      bphSurgeryOtherType: '',
    }
  }
  // 暴露变量
  defineExpose({
    openDialog,
  });
</script>

