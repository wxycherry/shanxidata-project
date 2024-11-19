<template>
	<div v-if="state.dialog.isShowDialog">
		<el-form ref="twoSymptomsDialogFormRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="90px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label-width="200px" label="是否完成症状评分" prop="symptomPerformed">
						<el-radio-group v-model="state.ruleForm.symptomPerformed">
							<el-radio v-for="dict in symptom_performed" :label="Number(dict.value)">{{ dict.label }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<div v-if="state.ruleForm.symptomPerformed === 1">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="评分时间" prop="scoreTime">
							<el-date-picker clearable v-model="state.ruleForm.scoreTime" type="date" value-format="YYYY-MM-DD" placeholder="选择评分时间">
							</el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
						<el-form-item label="IPSS数据" prop="ipssInfo">
							<dynamic-question-answer
								v-if="state.ruleForm.ipssInfo"
								:json-string="state.ruleForm.ipssInfo"
								@update:jsonString="handleAnswersUpdate('ipssInfo', $event)"
							></dynamic-question-answer>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
						<el-form-item label="QoL数据" prop="qolInfo">
							<dynamic-question-answer
								v-if="state.ruleForm.qolInfo"
								:json-string="state.ruleForm.qolInfo"
								@update:jsonString="handleAnswersUpdate('qolInfo', $event)"
							></dynamic-question-answer>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.loadingData">
						<el-form-item label="OABSS数据" prop="oabssInfo">
							<dynamic-question-answer
								v-if="state.ruleForm.oabssInfo"
								:json-string="state.ruleForm.oabssInfo"
								@update:jsonString="handleAnswersUpdate('oabssInfo', $event)"
							></dynamic-question-answer>
						</el-form-item>
					</el-col>
				</div>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="dictDialog">
import { defineAsyncComponent, nextTick, reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue';
import { useTwoSymptomsApi } from '/@/api/two/symptoms';
import { ElMessage } from 'element-plus';
import DynamicQuestionAnswer from '../symptoms/DynamicQuestionAnswer.vue';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const useTwoSymptoms = useTwoSymptomsApi();
const twoSymptomsDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		patientId: '',
		symptomPerformed: 0,
		scoreTime: '',
		ipssInfo:
			'{"score_key":"0-7:轻度;8-19:中度;20-35:重度","questions":[{"title":"是否经常有尿不尽感","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"两次排尿间隔时间是否经常小于2小时","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有间断性排尿","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否有排尿不能等待","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有尿线变细症状","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有需要用力才能开始排尿","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"从入睡到早起需要排尿几次","options":[{"key":0,"value":"没有"},{"key":1,"value":"1次"},{"key":2,"value":"2次"},{"key":3,"value":"3次"},{"key":4,"value":"4次"},{"key":5,"value":"5次及以上"}],"selected":null}]}',
		ipssScore: '',
		qolInfo:
			'{"score_key":"0:高兴;1:满意;2:大致满意;3:还可以;4:不太满意;5:苦恼;6:很糟","questions":[{"title":"如果在您以后的生活中始终伴有目前的排尿症状，您认为","options":[{"key":0,"value":"高兴"},{"key":1,"value":"满意"},{"key":2,"value":"大致满意"},{"key":3,"value":"还可以"},{"key":4,"value":"不太满意"},{"key":5,"value":"苦恼"},{"key":6,"value":"很糟"}],"selected":null}]}',
		qolScore: '',
		oabssInfo:
			'{"score_key":"0-5:轻度;6-11:中度;12及以上:重度","questions":[{"title":"从早上起床到晚上入睡的时间内，小便次数","options":[{"key":0,"value":"≤7次"},{"key":1,"value":"8-14次"},{"key":2,"value":"≥15次"}],"selected":null},{"title":"从晚上入睡到早起的排尿次数","options":[{"key":0,"value":"0次"},{"key":1,"value":"1次"},{"key":2,"value":"2次"},{"key":3,"value":"3次及以上"}],"selected":null},{"title":"是否有突然想小便，同时无法忍受的现象","options":[{"key":0,"value":"无"},{"key":1,"value":"每周＜1次"},{"key":2,"value":"每周≥1次"},{"key":3,"value":"每日1次"},{"key":4,"value":"每次2-4次"},{"key":5,"value":"每次≥5次"}],"selected":null},{"title":"是否有突然想小便，同时无法忍受出现尿失禁的现象","options":[{"key":0,"value":"无"},{"key":1,"value":"每周＜1次"},{"key":2,"value":"每周≥1次"},{"key":3,"value":"每日1次"},{"key":4,"value":"每次2-4次"},{"key":5,"value":"每次≥5次"}],"selected":null}]}',
		oabssScore: '',
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
const { symptom_performed } = proxy.parseDict('symptom_performed');

// 打开弹窗
const openDialog = (type: string, row) => {
	resetForm();
	if (type === 'edit') {
		useTwoSymptoms.getTwoSymptomsById(row.id).then((res) => {
			state.ruleForm = res;
			state.dialog.title = '修改症状评分';
			state.dialog.submitTxt = '修 改';
			state.loadingData = true;
		});
	} else {
		// 自动填充身份证ID
		state.ruleForm.patientId = row.patientId;
		state.dialog.title = '新增症状评分';
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

const handleAnswersUpdate = (propertyName: string, answers: (number | null)[]) => {
	// 在这里处理来自子组件的答案更新
	console.log('Answers updated:', answers);
	state.ruleForm[propertyName] = answers;
};

// 提交
const onSubmit = () => {
	// 验证表单
	Promise.all([currentValidate(twoSymptomsDialogFormRef)]).then((res) => {
		const validateResult = res.every((item) => !!item);
		if (validateResult) {
			if (state.dialog.type == 'add') {
				useTwoSymptoms.createTwoSymptoms(state.ruleForm).then(() => {
					// ElMessage.success('创建成功');
					closeDialog();
					emit('refresh');
				});
			} else {
				useTwoSymptoms.updateTwoSymptoms(state.ruleForm).then(() => {
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
		symptomPerformed: 0,
		scoreTime: '',
		ipssInfo:
			'{"score_key":"0-7:轻度;8-19:中度;20-35:重度","questions":[{"title":"是否经常有尿不尽感","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"两次排尿间隔时间是否经常小于2小时","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有间断性排尿","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否有排尿不能等待","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有尿线变细症状","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"是否经常有需要用力才能开始排尿","options":[{"key":0,"value":"从未"},{"key":1,"value":"在5次中少于1次"},{"key":2,"value":"少于半数"},{"key":3,"value":"大约半数"},{"key":4,"value":"多于半数"},{"key":5,"value":"几乎每次"}],"selected":null},{"title":"从入睡到早起需要排尿几次","options":[{"key":0,"value":"没有"},{"key":1,"value":"1次"},{"key":2,"value":"2次"},{"key":3,"value":"3次"},{"key":4,"value":"4次"},{"key":5,"value":"5次及以上"}],"selected":null}]}',
		ipssScore: '',
		qolInfo:
			'{"score_key":"0:高兴;1:满意;2:大致满意;3:还可以;4:不太满意;5:苦恼;6:很糟","questions":[{"title":"如果在您以后的生活中始终伴有目前的排尿症状，您认为","options":[{"key":0,"value":"高兴"},{"key":1,"value":"满意"},{"key":2,"value":"大致满意"},{"key":3,"value":"还可以"},{"key":4,"value":"不太满意"},{"key":5,"value":"苦恼"},{"key":6,"value":"很糟"}],"selected":null}]}',
		qolScore: '',
		oabssInfo:
			'{"score_key":"0-5:轻度;6-11:中度;12及以上:重度","questions":[{"title":"从早上起床到晚上入睡的时间内，小便次数","options":[{"key":0,"value":"≤7次"},{"key":1,"value":"8-14次"},{"key":2,"value":"≥15次"}],"selected":null},{"title":"从晚上入睡到早起的排尿次数","options":[{"key":0,"value":"0次"},{"key":1,"value":"1次"},{"key":2,"value":"2次"},{"key":3,"value":"3次及以上"}],"selected":null},{"title":"是否有突然想小便，同时无法忍受的现象","options":[{"key":0,"value":"无"},{"key":1,"value":"每周＜1次"},{"key":2,"value":"每周≥1次"},{"key":3,"value":"每日1次"},{"key":4,"value":"每次2-4次"},{"key":5,"value":"每次≥5次"}],"selected":null},{"title":"是否有突然想小便，同时无法忍受出现尿失禁的现象","options":[{"key":0,"value":"无"},{"key":1,"value":"每周＜1次"},{"key":2,"value":"每周≥1次"},{"key":3,"value":"每日1次"},{"key":4,"value":"每次2-4次"},{"key":5,"value":"每次≥5次"}],"selected":null}]}',
		oabssScore: '',
	};
};
// 暴露变量
defineExpose({
	openDialog,
	onSubmit,
});
</script>
