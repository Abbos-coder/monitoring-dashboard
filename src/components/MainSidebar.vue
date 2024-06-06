<template>
  <div>
    <router-link to="/">
      <div class="logo">
        <img alt="logo" class="img" src="@/assets/icons/sidebar/logo.svg" />
      </div>
    </router-link>
    <el-menu
      class="el-menu-vertical-demo"
      default-active="1"
      :default-openeds="['1']"
      active-text-color="#193787"
    >
      <div class="sidebar__search">
        <el-input
          v-model="_search"
          :suffix-icon="Search"
          class="w-50 m-2"
          placeholder="Поиск по странице..."
        />
      </div>
      <template v-for="route in _routes_list" :key="route.idx">
        <el-sub-menu :index="route.idx" v-if="route.isChild">
          <template #title>
          <span class="mr-2">
            <img :src="route.image" :alt="route.name" />
          </span>
            <span class="text-capitalize">{{ route.name }}</span>
          </template>
          <template
            v-for="child in route.children"
            :key="child.idx"
          >
            <router-link
              :to="child.url"
              active-class="is_active_route"
            >
              <el-menu-item :index="child.idx" class="text-capitalize">
                <span class="mr-2 dot"></span>
                {{ child.name }}
              </el-menu-item>
            </router-link>
          </template>
        </el-sub-menu>
        <el-menu-item index="2" v-else>
        <span class="mr-2">
          <img id="icon" alt="logout icon" :src="route.image" />
        </span>
          <span class="text-capitalize">{{ route.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import _routes_list from '@/sidebar-routes.json'

const _search = ref<string>('')
</script>

<style src="@/assets/styles/ComponentsStyles/_sidebar.style.scss" scoped />
