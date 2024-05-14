<template>
  <div>
    <h1>我是一级路由展示登录成功以后的数据</h1>
  </div>
</template>
  
  <script setup lang="ts">
// 引入组合式API函数之生命周期函数
import { onMounted } from "vue";

// 引入用户相关的小仓库
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
onMounted(() => {
  // 获取用户信息
  userStore.userInfo();
});
</script>
  
  <style>
</style>