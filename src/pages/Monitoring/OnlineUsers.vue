<template>
  <div>
    <el-card shadow="never" style=" border: none">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2>Мониторинг онлайн-пользователей</h2>
        <el-input
          v-model="_search"
          placeholder="Search"
          style="width: 250px;"
          :suffix-icon="Search"
        />
      </div>
      <el-table
        :data="_online_users"
        style="width: 100%"
        header-cell-class-name="table-head-color"
        v-loading="_table_loader"
        stripe
      >
        <el-table-column label="Name" prop="name" />
        <el-table-column label="User name" prop="username" />
        <el-table-column label="Point name" prop="pointname" />
        <el-table-column label="Create time" prop="createtime" />
        <el-table-column label="Last access" prop="lastaccess" />
      </el-table>
      <div class="d-flex justify-center mb-2" style="padding-top: 30px">
        <el-pagination
          v-model:current-page="_current_page"
          v-model:page-size="_current_size"
          :page-sizes="[10, 30, 50, 100, 200]"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="200"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useOnlineUsersStore } from '@/stores/onlineUsers.pinia'
import { Search } from '@element-plus/icons-vue'
import { useRouter, type Router } from 'vue-router'

const router: Router = useRouter()
const { getOnlineUsers } = useOnlineUsersStore()
const { _online_users, _table_loader } = storeToRefs(useOnlineUsersStore())

const _search = ref([])
const _current_page = ref(1)
const _current_size = ref(10)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
onMounted(async () => {
  const isToken = localStorage.getItem('_token')
  if (!isToken) {
   await router.push('/login')
  }
  await getOnlineUsers()
})

</script>

<style scoped>

</style>