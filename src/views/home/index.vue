<template>
  <div class="layout-pd">
    <!-- 中部LOGO -->
    <el-image style="height: 100%"  :src="state.url" fit="fill" />
  </div>
</template>

<script setup lang="ts" name="home">
import { reactive, onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

const state = reactive({
  url: 'src/assets/bgimage.png'
});

// 页面加载时
onMounted(() => {

});


</script>
<style scoped lang="scss">

</style>
