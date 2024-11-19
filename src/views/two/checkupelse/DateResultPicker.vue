<template>
  <div class="input-date-wrapper">
    <el-select v-model="selectedDate" placeholder="请选择日期" @change="updateDate" style="width: 150px">
      <el-option
          v-for="item in formattedData"
          :key="item.date"
          :value="item.date">
          {{ item.date }}
          <el-icon 
            style="color: var(--el-text-color-secondary);margin-left:10px;"
            @click.stop = onDeleteOption(item.date)
          >
            <CircleClose />
          </el-icon>
      </el-option>
      <template #footer>
        <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
          新增检验结果
        </el-button>
        <template v-else>
          <el-date-picker
            v-model="addDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
            size="small"
            style="margin-bottom: 10px;">
          </el-date-picker>
          <br/>
          <el-button type="primary" size="small" @click="onConfirm">确认</el-button>
          <el-button size="small" @click="clear">取消</el-button>
        </template>
      </template>
    </el-select>
    <el-input v-model="currentData.result" @blur="updateResult" placeholder="请输入结果" 
    :disabled="dataArray.length === 0"></el-input>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, onMounted, ref, watch} from 'vue';
import { ElMessage } from 'element-plus';
import { CircleClose } from "@element-plus/icons-vue"

interface DataItem {
  result: string;
  date: string;
}

// 定义props
const props = defineProps({
  dataString: {
    type: String,
    default: '' // 默认为空数组（字符串形式）
  },
});

// 定义emits
const emit = defineEmits(['update:dataString']);

// 初始数据
const dataArray  = ref<DataItem[]>([]);
const selectedDate = ref('');
const currentData = ref<DataItem>({ result: '', date: '' });
const formattedData = computed(() => {
  if (dataArray.value === null) return [];
  else {
     return dataArray.value.map(item => ({ ...item }))
  }
});
const stringToArray = () => {
  try {
    dataArray.value = [];   
    if (props.dataString === '[{"result":"","date":""}]' || props.dataString === '' || props.dataString === '[]') {
      dataArray.value = [];
      return
    }
    if(props.dataString !== null) {
      dataArray.value = JSON.parse(props.dataString) as DataItem[];
    }
    if (dataArray.value.length > 0) {
      // 默认选择第一个数据项
      selectedDate.value = dataArray.value[0].date;
      currentData.value = { ...dataArray.value[0] };
    }
  } catch (error) {
    if (dataArray.value !== null) {
      ElMessage.error('解析数据失败');
    }
  }
}
onMounted(() => {
  stringToArray();
});
watch(() => props.dataString, () => {
  // console.log(props.dataString);
  stringToArray()
})
// 监听selectedDate变化
watch(selectedDate, (newDate) => {
  // console.log(selectedDate.value);
  const item = dataArray.value.find(item => item.date === newDate);
  // console.log(item);
  if (item) {
    currentData.value = { ...item };
    // emit('update:dataString', JSON.stringify(dataArray.value));
  }
});

watch(dataArray, () => {
  if (dataArray.value.length === 0) {
    dataArray.value === null;
    currentData.value.result = '';
    selectedDate.value = '';
  }
  dataArray.value.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);    // 如果dateA在dateB之前，返回负数
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
  // console.log(dataArray.value);
  emit('update:dataString', JSON.stringify(dataArray.value));
}, { deep: true });

// 用于el-date-picker的change事件，因为v-model可能无法正确处理日期选择器的change事件
function updateDate(date: string) {
  selectedDate.value = date;
}
function updateResult() {  
  const index = dataArray.value.findIndex(item => item.date === currentData.value.date);
  if (index !== -1) {
    dataArray.value[index] = currentData.value;
    // emit('update:dataString', JSON.stringify(dataArray.value));
  }
}

const isAdding = ref(false)
const addDate = ref<string|null>('')
const onAddOption = () => {
  isAdding.value = true
}
const onDeleteOption = (date:string) => {
  const index = dataArray.value.findIndex(item => item.date === date)
  if (index !== -1) {
    dataArray.value.splice(index, 1)
  }
}
const onConfirm = () => {
  //新增日期的判断选项
  dataArray.value.forEach((item: any) => {
    if (item.date === addDate.value) {
      addDate.value = null
      ElMessage.error('该日期已存在');
    }
  })
  if (addDate.value) {
    //新增日期
    dataArray.value.push({
      date: addDate.value,
      result: ''
    })
    clear()
  }
}

const clear = () => {
  addDate.value = ''
  isAdding.value = false
}
</script>

<style scoped lang="scss">
.inline-form-item .input-date-wrapper {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.inline-form-item .el-select,
.inline-form-item .el-input,
.inline-form-item .el-date-picker {
  width: auto; /* 或者设置一个具体的宽度 */
  margin-right: 10px; /* 可选，添加间距 */
}

.inline-form-item .ml-sm {
  /* 这里是一个小的 margin-left，用于调整 el-date-picker 的位置 */
  margin-left: 10px;
}
</style>