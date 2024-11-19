<template>
    <div v-if="state.dialog.isShowDialog">
      <el-form ref="twoHistoryDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default"
               label-width="90px">
        <el-row :gutter="35">
          <el-col class="mb20">
            <el-form-item label-width="200px" label="高血压" prop="hypertension">
              <el-radio-group v-model="state.ruleForm.hypertension">
                <el-radio
                    v-for="dict in two_history_hypertension"
                    :key="dict.value"
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20" v-if="state.ruleForm.hypertension === 1">
            <el-form-item label-width="200px" label="高血压诊断日期" prop="hypertensionDate">
              <el-date-picker clearable
                              v-model="state.ruleForm.hypertensionDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择高血压诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="糖尿病" prop="diabetes">
              <el-radio-group v-model="state.ruleForm.diabetes">
                <el-radio
                    v-for="dict in two_history_diabetes"
                    :key="dict.value"
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20" v-if="state.ruleForm.diabetes === 1">
            <el-form-item label-width="200px" label="糖尿病诊断日期" prop="diabetesDate">
              <el-date-picker clearable
                              v-model="state.ruleForm.diabetesDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择糖尿病诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="高血脂" prop="hyperlipidemia">
              <el-radio-group v-model="state.ruleForm.hyperlipidemia">
                <el-radio
                    v-for="dict in two_history_hyperlipidemia"
                    :key = dict.value
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20" v-if="state.ruleForm.hyperlipidemia === 1">
            <el-form-item label-width="200px" label="高血脂诊断日期" prop="hyperlipidemiaDate">
              <el-date-picker clearable
                              v-model="state.ruleForm.hyperlipidemiaDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择高血脂诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="脑血管疾病" prop="cerebrovascular">
              <el-radio-group v-model="state.ruleForm.cerebrovascular">
                <el-radio
                    v-for="dict in two_history_cerebrovascular"
                    :key = dict.value
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20" v-if="state.ruleForm.cerebrovascular === 1">
            <el-form-item label-width="200px" label="脑血管疾病诊断日期" prop="cerebrovascularDate">
              <el-date-picker clearable
                              v-model="state.ruleForm.cerebrovascularDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择脑血管疾病诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="前列腺癌" prop="prostateCancer">
              <el-radio-group v-model="state.ruleForm.prostateCancer">
                <el-radio
                    v-for="dict in two_history_prostate_cancer"
                    :key = dict.value
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="前列腺癌诊断日期" prop="prostateCancerDate"
                          v-if="state.ruleForm.prostateCancer === 1">
              <el-date-picker clearable
                              v-model="state.ruleForm.prostateCancerDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择前列腺癌诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="前列腺增生手术史" prop="prostateSurgery">
              <el-radio-group v-model="state.ruleForm.prostateSurgery">
                <el-radio
                    v-for="dict in two_history_prostate_surgery"
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="前列腺增生手术史诊断日期" prop="prostateSurgeryDate"
                          v-if="state.ruleForm.prostateSurgery === 1">
              <el-date-picker clearable
                              v-model="state.ruleForm.prostateSurgeryDate"
                              type="date"
                              value-format="YYYY-MM-DD"
                              placeholder="选择前列腺增生手术史诊断日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="前列腺增生患者" prop="prostatePatient">
              <el-radio-group v-model="state.ruleForm.prostatePatient">
                <el-radio
                    v-for="dict in two_history_prostate_patient"
                    :key="dict.value"
                    :value="Number(dict.value)">
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col class="mb20" v-if="state.ruleForm.prostatePatient === 1">
            <el-form-item label-width="200px" label="前列腺增生用药" prop="prostateMedication">
              <el-radio-group v-model="state.ruleForm.prostateMedication">
                <el-radio
                    v-for="dict in two_history_prostate_medication"
                    :key="dict.value"
                    :value="Number(dict.value)">
                    {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"
                  v-if="state.ruleForm.prostateMedication === 4">
            <el-form-item label-width="200px" label="其他药物" prop="otherMeds">
              <el-input type="textarea" :rows="1" v-model="state.ruleForm.otherMeds" placeholder="请输入其他药物"
                        clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col class="mb20">
            <el-form-item label-width="200px" label="家族癌史" prop="familyCancer">
              <el-radio-group v-model="state.ruleForm.familyCancer">
                <el-radio
                    v-for="dict in two_history_family_cancer"
                    :value="Number(dict.value)"
                >{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.ruleForm.familyCancer === 1">
					<el-form-item label-width="200px" label="患癌成员" prop="familyMembers">
						<el-input type="textarea" :rows="1" v-model="state.ruleForm.familyMembers" placeholder="请输入患癌成员" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="dictDialog">
import {reactive, ref, getCurrentInstance } from 'vue';
import {useTwoHistoryApi} from '/@/api/two/history';
import {ElMessage} from "element-plus";


// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 获取字典
const {proxy} = getCurrentInstance();
const {
	two_history_hypertension,
	two_history_cerebrovascular,
	two_history_prostate_cancer,
	two_history_prostate_patient,
	two_history_prostate_medication,
	two_history_family_cancer,
	two_history_diabetes,
	two_history_hyperlipidemia,
	two_history_prostate_surgery,
} = proxy.parseDict(
	'two_history_hypertension',
	'two_history_cerebrovascular',
	'two_history_prostate_cancer',
	'two_history_prostate_patient',
	'two_history_prostate_medication',
	'two_history_family_cancer',
	'two_history_diabetes',
	'two_history_hyperlipidemia',
	'two_history_prostate_surgery'
);

// 定义变量内容
const useTwoHistory = useTwoHistoryApi();
const twoHistoryDialogFormRef = ref();
const state = reactive({
	ruleForm: {
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
		prostatePatient: '',
		prostateMedication: '',
		otherMeds: '',
		familyCancer: '',
		familyMembers: '',
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
const openDialog = (type: string, row:any) => {
  resetForm();
  if (type === 'edit') {
    useTwoHistory.getTwoHistoryById(row.id).then((res:any) => {
      state.ruleForm = res;
    });
  } else {
    // 自动填充身份证ID
    state.ruleForm.patientId = row.patientId
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
    currentValidate(twoHistoryDialogFormRef),
  ]).then(res => {
    const validateResult = res.every(item => !!item);
    if (validateResult) {
      if (state.dialog.type == 'add') {
        useTwoHistory.createTwoHistory(state.ruleForm).then(() => {
          // ElMessage.success('创建成功');
          closeDialog();
          emit('refresh');
        });
      } else {
        useTwoHistory.updateTwoHistory(state.ruleForm).then(() => {
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

const resetForm = () => {
	state.ruleForm = {
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
		prostatePatient: '',
		prostateMedication: '',
		otherMeds: '',
		familyCancer: '',
		familyMembers: '',
	};
};
// 暴露变量
defineExpose({
  openDialog,onSubmit
});
</script>

