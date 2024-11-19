<template>
  <div>
    <div
        class="question-and-answer"
        v-for="(question, index) in parsedData.questions"
        :key="index"
    >
      <div class="question">
        <span class="question-text"><b>{{ index + 1 }}.{{ question.title }}</b></span>
      </div>
      <div class="answer">
        <el-radio-group v-model="question.selected" @change="updateScore">
          <el-radio
              v-for="(option, optIndex) in question.options"
              :key="optIndex"
              :value="option.key"
          >
            {{ option.value }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="score-display">
      <span>总得分: {{ score }} 分，程度：{{ scoreText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
  jsonString: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:jsonString']);

// 初始数据
const parsedData = ref<any>(null);
const score = ref(0);

// 监听props变化并解析JSON
watch(props, (newProps) => {
  if (newProps.jsonString) {
    try {
      parsedData.value = JSON.parse(newProps.jsonString);
      // 初始化分数
      calculateScore();
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
}, { immediate: true });

function parseScoreKey(score: number, keyString: string): string {
  const scores = keyString.split(';');
  for (let i = 0; i < scores.length; i++) {
    const [range, text] = scores[i].split(':');
    const [min, max] = range.split('-').map(Number);
    if (score >= min && score <= max) {
      return text;
    }
  }
  return '其他';
}

// 计算总分
function calculateScore() {
  score.value = parsedData.value?.questions.reduce((acc, q) => acc + q.selected, 0) || 0;
  // 根据总分计算程度文本
  const scoreText = parseScoreKey(score.value, parsedData.value?.score_key || '');
}

// 当某个问题的选择发生变化时，重新计算总分
function updateScore() {
  calculateScore();
  // 发送新的JSON给父组件
  // console.log(JSON.stringify(parsedData.value))
  emit('update:jsonString', JSON.stringify(parsedData.value));
}

// 计算得分的文本表示
const scoreText = computed(() => parseScoreKey(score.value, parsedData.value?.score_key || ''));

</script>

<style scoped lang="scss">
.question-and-answer {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 如果需要垂直居中，可以改为 align-items: center; */
}

.question {
  margin-bottom: 10px; /* 根据你的需要调整垂直间距 */
}

.question-text {
  font-weight: bold; /* 保留 <b> 标签的加粗效果 */
}

.answer {
  /* 你可以在这里添加更多样式来定制单选按钮组的外观 */
}
</style>