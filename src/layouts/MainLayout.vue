<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="300px">
          <MainSidebar />
        </el-aside>
        <el-container>
          <el-header style="height: 80px;">
            <MainHeader />
          </el-header>
          <el-main class="main">
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import MainSidebar from '@/components/MainSidebar.vue'
</script>

<style lang="scss" scoped>
.main {
  background: #f9f9f9;
  //margin-top: 20px;
  min-height: 100vh;
}
</style>
