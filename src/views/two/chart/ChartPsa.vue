<template>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue';
import * as echarts from 'echarts';
import {useTwoPsacheckupApi} from "/@/api/two/psacheckup";

const chartRef = ref<HTMLElement | null>(null);

// 使用 defineProps 来定义 prop 类型
const props = defineProps<{
  title: string,
  attr: string
}>();

const initData = async () => {
  const res = await useTwoPsacheckupApi().getCount(props.attr);
  initChart(res)
}

const initChart = (data: any) => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    const option = {
      title: {
        text: `${props.title}检查统计`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [`${props.title}正常`, `${props.title}异常`, `未检查${props.title}`]
      },
      series: [
        {
          name: '检查状态',
          type: 'pie',
          radius: '55%',
          data: [
            { value: data.checked_normal, name: `${props.title}正常`},
            { value: data.checked_abnormal, name: `${props.title}异常`},
            { value: data.unchecked, name: `未检查${props.title}`}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
  }
};

// 页面加载时
onMounted(() => {
  initData();
});

</script>

<style scoped lang="scss">

</style>