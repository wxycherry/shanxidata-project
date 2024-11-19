<template>
	<div v-if="state.dialog.isShowDialog">
		<el-form ref="twoCheckupDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
			<el-row :gutter="35">
				<!--              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">-->
				<!--                <el-form-item label-width="200px" label="身份证号码" prop="patientId">-->
				<!--                  <el-input v-model="state.ruleForm.patientId" placeholder="请输入身份证号码" clearable></el-input>-->
				<!--                </el-form-item>-->
				<!--              </el-col>-->

				<!-- JSON数据转化 -->

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
					<el-form-item label-width="200px" label="PSA检验结果" prop="psa" class="inline-form-item">
						<DateResultPicker :dataString="state.ruleForm.psa" @update:dataString="handleDataUpdate('psa', $event)" />
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
					<el-form-item label-width="200px" label="fPSA检验结果" prop="fPsa" class="inline-form-item">
						<DateResultPicker :dataString="state.ruleForm.fPsa" @update:dataString="handleDataUpdate('fPsa', $event)" />
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
					<el-form-item label-width="200px" label="PAP检测结果" prop="pap" class="inline-form-item">
						<DateResultPicker :dataString="state.ruleForm.pap" @update:dataString="handleDataUpdate('pap', $event)" />
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
					<el-form-item label-width="200px" label="PHI检验结果" prop="phi" class="inline-form-item">
						<DateResultPicker :dataString="state.ruleForm.phi" @update:dataString="handleDataUpdate('phi', $event)" />
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
					<el-form-item label-width="200px" label="-2proPSA检验结果" prop="proPsa" class="inline-form-item">
						<DateResultPicker :dataString="state.ruleForm.proPsa" @update:dataString="handleDataUpdate('proPsa', $event)" />
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="体检时间" prop="checkupTime">
						<el-date-picker
							clearable
							v-model="state.ruleForm.checkupTime"
							type="month"
							value-format="YYYY-MM-DD"
							format="YYYY-MM"
							placeholder="选择体检时间"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="总胆固醇" prop="chol">
						<el-input v-model="state.ruleForm.chol" placeholder="请输入总胆固醇" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="高密度脂蛋白胆固醇" prop="hdl">
						<el-input v-model="state.ruleForm.hdl" placeholder="请输入高密度脂蛋白胆固醇" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="低密度脂蛋白胆固醇" prop="ldl">
						<el-input v-model="state.ruleForm.ldl" placeholder="请输入低密度脂蛋白胆固醇" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="丙氨酸氨基转移酶" prop="alt">
						<el-input v-model="state.ruleForm.alt" placeholder="请输入丙氨酸氨基转移酶" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="天门冬氨酸氨基转移酶" prop="ast">
						<el-input v-model="state.ruleForm.ast" placeholder="请输入天门冬氨酸氨基转移酶" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="尿素" prop="urea">
						<el-input v-model="state.ruleForm.urea" placeholder="请输入尿素" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="肌酐" prop="creatinine">
						<el-input v-model="state.ruleForm.creatinine" placeholder="请输入肌酐" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="尿酸" prop="uricAcid">
						<el-input v-model="state.ruleForm.uricAcid" placeholder="请输入尿酸" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="甘油三酯" prop="triglycerides">
						<el-input v-model="state.ruleForm.triglycerides" placeholder="请输入甘油三酯" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="同型半胱氨酸" prop="homocysteine">
						<el-input v-model="state.ruleForm.homocysteine" placeholder="请输入同型半胱氨酸" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="总胆红素" prop="bilirubin">
						<el-input v-model="state.ruleForm.bilirubin" placeholder="请输入总胆红素" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="红细胞计数" prop="rbcCount">
						<el-input v-model="state.ruleForm.rbcCount" placeholder="请输入红细胞计数" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="血红蛋白" prop="hgb">
						<el-input v-model="state.ruleForm.hgb" placeholder="请输入血红蛋白" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="红细胞压积" prop="hematocrit">
						<el-input v-model="state.ruleForm.hematocrit" placeholder="请输入红细胞压积" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="血小板计数" prop="plateletCount">
						<el-input v-model="state.ruleForm.plateletCount" placeholder="请输入血小板计数" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="白细胞计数" prop="wbcCount">
						<el-input v-model="state.ruleForm.wbcCount" placeholder="请输入白细胞计数" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="中性粒细胞比率" prop="neutrophilRatio">
						<el-input v-model="state.ruleForm.neutrophilRatio" placeholder="请输入中性粒细胞比率" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="腹部B超结果" prop="ultrasound">
						<el-input v-model="state.ruleForm.ultrasound" placeholder="请输入腹部B超结果" clearable></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="异常情况" prop="abnormalities">
						<el-input type="textarea" :rows="1" v-model="state.ruleForm.abnormalities" placeholder="请输入异常情况" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="dictDialog">
import { defineAsyncComponent, nextTick, reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue';
import { useTwoCheckupelseApi } from '/@/api/two/checkupelse';
import { ElMessage } from 'element-plus';
import DateResultPicker from '../checkupelse/DateResultPicker.vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const useTwoCheckupelse = useTwoCheckupelseApi();
const twoCheckupDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		patientId: '',
		psa: '',
		fPsa: '',
		pap: '',
		phi: '',
		proPsa: '',
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
	loadingData: false,
});


const handleDataUpdate = (propertyName: string, newDataString: string) => {
	state.ruleForm[propertyName] = newDataString; // 同时更新dataString，以便下次传入子组件
};

// 打开弹窗
const openDialog = (type: string, row) => {
	resetForm();
	if (type === 'edit') {
		useTwoCheckupelse.getTwoCheckupelseById(row.id).then((res) => {
			state.ruleForm = res;
			state.dialog.title = '修改社区体检结果';
			state.dialog.submitTxt = '修 改';
			state.loadingData = true;
		});
	} else {
		// 自动填充身份证ID
		state.ruleForm.patientId = row.patientId;
		state.dialog.title = '新增社区体检结果';
		state.dialog.submitTxt = '新 增';
		state.loadingData = true;
	}
	state.dialog.type = type;
	state.dialog.isShowDialog = true;
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
	Promise.all([currentValidate(twoCheckupDialogFormRef)]).then((res) => {
		const validateResult = res.every((item) => !!item);
		if (validateResult) {
			if (state.dialog.type == 'add') {
				useTwoCheckupelse.createTwoCheckupelse(state.ruleForm).then(() => {
					// ElMessage.success('创建成功');
					closeDialog();
					emit('refresh');
				});
			} else {
				useTwoCheckupelse.updateTwoCheckupelse(state.ruleForm).then(() => {
					// ElMessage.success('修改成功');
					closeDialog();
					emit('refresh');
				});
			}
		} else {
			ElMessage.error('表单校验未通过，请重新检查提交内容');
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
		psa: '',
		fPsa: '',
		pap: '',
		phi: '',
		proPsa: '',
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
	};
};
// 暴露变量
defineExpose({
	openDialog,
	onSubmit,
});
</script>


