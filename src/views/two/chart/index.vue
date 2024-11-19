<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="8"><chart-psa title="PSA" attr="psa"/></el-col>
      <el-col :span="8"><chart-psa title="fPSA" attr="f_psa"/></el-col>
      <el-col :span="8"><chart-psa title="PAP" attr="pap"/></el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8"><chart-psa title="PHI" attr="phi"/></el-col>
      <el-col :span="8"><chart-psa title="[-2]proPSA" attr="pro_psa"/></el-col>
      <el-col :span="8"><chart-test-result title="MRI" attr="mri_performed"/></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
// import {useTagsViewRoutes} from "/@/stores/tagsViewRoutes";
// import {useThemeConfig} from "/@/stores/themeConfig";
// import {storeToRefs} from "pinia";

// const storesTagsViewRoutes = useTagsViewRoutes();
// const storesThemeConfig = useThemeConfig();
// const { themeConfig } = storeToRefs(storesThemeConfig);
// const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

// 引入组件
const ChartPsa = defineAsyncComponent(() => import('./ChartPsa.vue',));
const ChartTestResult = defineAsyncComponent(() => import('./ChartTestResult.vue'));
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>