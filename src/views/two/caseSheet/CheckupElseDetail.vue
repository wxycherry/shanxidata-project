<template>
	<div v-if="state.dialog.isShowDialog">
		<el-form ref="twoCheckupelseDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="155px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="是否参加社区体检" prop="checkupPerformed">
						<el-radio-group v-model="state.ruleForm.checkupPerformed">
							<el-radio v-for="dict in checkup_performed" :label="Number(dict.value)">{{ dict.label }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<div v-if="state.ruleForm.checkupPerformed === 1">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="体检时间" prop="checkupTime">
							<el-date-picker clearable v-model="state.ruleForm.checkupTime" type="date" value-format="yyyy-MM-dd" placeholder="选择体检时间">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="总胆固醇" prop="chol">
							<el-input v-model="state.ruleForm.chol" placeholder="请输入总胆固醇" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="高密度脂蛋白胆固醇" prop="hdl">
							<el-input v-model="state.ruleForm.hdl" placeholder="请输入高密度脂蛋白胆固醇" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="低密度脂蛋白胆固醇" prop="ldl">
							<el-input v-model="state.ruleForm.ldl" placeholder="请输入低密度脂蛋白胆固醇" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="丙氨酸氨基转移酶" prop="alt">
							<el-input v-model="state.ruleForm.alt" placeholder="请输入丙氨酸氨基转移酶" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="天门冬氨酸氨基转移酶" prop="ast">
							<el-input v-model="state.ruleForm.ast" placeholder="请输入天门冬氨酸氨基转移酶" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="尿素" prop="urea">
							<el-input v-model="state.ruleForm.urea" placeholder="请输入尿素" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="肌酐" prop="creatinine">
							<el-input v-model="state.ruleForm.creatinine" placeholder="请输入肌酐" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="尿酸" prop="uricAcid">
							<el-input v-model="state.ruleForm.uricAcid" placeholder="请输入尿酸" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="甘油三酯" prop="triglycerides">
							<el-input v-model="state.ruleForm.triglycerides" placeholder="请输入甘油三酯" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="同型半胱氨酸" prop="homocysteine">
							<el-input v-model="state.ruleForm.homocysteine" placeholder="请输入同型半胱氨酸" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="总胆红素" prop="bilirubin">
							<el-input v-model="state.ruleForm.bilirubin" placeholder="请输入总胆红素" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="红细胞计数" prop="rbcCount">
							<el-input v-model="state.ruleForm.rbcCount" placeholder="请输入红细胞计数" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="血红蛋白" prop="hgb">
							<el-input v-model="state.ruleForm.hgb" placeholder="请输入血红蛋白" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="红细胞压积" prop="hematocrit">
							<el-input v-model="state.ruleForm.hematocrit" placeholder="请输入红细胞压积" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="血小板计数" prop="plateletCount">
							<el-input v-model="state.ruleForm.plateletCount" placeholder="请输入血小板计数" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="白细胞计数" prop="wbcCount">
							<el-input v-model="state.ruleForm.wbcCount" placeholder="请输入白细胞计数" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="中性粒细胞比率" prop="neutrophilRatio">
							<el-input v-model="state.ruleForm.neutrophilRatio" placeholder="请输入中性粒细胞比率" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="腹部B超结果" prop="ultrasound">
							<el-input v-model="state.ruleForm.ultrasound" placeholder="请输入腹部B超结果" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="异常情况" prop="abnormalities">
							<el-input type="textarea" :rows="3" v-model="state.ruleForm.abnormalities" placeholder="请输入异常情况" clearable></el-input>
						</el-form-item>
					</el-col>
				</div>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="dictDialog">
import { defineAsyncComponent, nextTick, reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue';
import { useTwoCheckupelseApi } from '/@/api/two/checkupelse';
import { ElMessage } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const useTwoCheckupelse = useTwoCheckupelseApi();
const twoCheckupelseDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		checkupPerformed: 0,
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

const { proxy } = getCurrentInstance();
const { checkup_performed } = proxy.parseDict('checkup_performed');

// 打开弹窗
const openDialog = (type: string, row) => {
	resetForm();
	if (type === 'edit') {
		useTwoCheckupelse.getTwoCheckupelseById(row.id).then((res) => {
			state.ruleForm = res;
			state.dialog.title = '修改社区检测结果信息';
			state.dialog.submitTxt = '修 改';
			state.dialog.isShowDialog = true;
		});
	} else {
		state.ruleForm.patientId = row.patientId;
		state.dialog.title = '新增社区检测结果信息';
		state.dialog.submitTxt = '新 增';
		state.dialog.isShowDialog = true;
	}
	state.dialog.type = type;
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
	Promise.all([currentValidate(twoCheckupelseDialogFormRef)]).then((res) => {
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
		checkupPerformed: 0,
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
	};
};
// 暴露变量
defineExpose({
	openDialog,
	onSubmit,
});
</script>

