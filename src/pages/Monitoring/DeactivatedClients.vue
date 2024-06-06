<template>
  <div>
    <el-card shadow="never" style="border: none">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2>Мониторинг деактивированных клиентов</h2>
        <el-input
          v-model="_search"
          placeholder="Search"
          style="width: 250px;"
          :suffix-icon="Search"
        />
      </div>
      <el-table
        :data="_deactivated_clients"
        style="width: 100%"
        header-cell-class-name="table-head-color"
        v-loading="_table_loader"
        stripe
      >
        <template
          v-for="item in _table_headers"
          :key='item.prop'
        >
          <el-table-column
            :label="item.title"
            :prop="item.prop"
            :width="item.width"
          />
        </template>
      </el-table>
      <div class="d-flex justify-center mb-2" style="padding-top: 30px">
        <el-pagination
          v-model:current-page="_current_page"
          v-model:page-size="_current_size"
          :page-sizes="[20, 30, 50, 100, 200]"
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
import { ref } from 'vue'
import { useDeactivatedClients } from '@/stores/deactivated-clients.pinia'
import { storeToRefs } from 'pinia'
import { Search } from '@element-plus/icons-vue'
import type { ITableHeader } from '@/types/table'

const { getDeactivatedClients } = useDeactivatedClients()
const { _deactivated_clients, _table_loader } = storeToRefs(useDeactivatedClients())

getDeactivatedClients()

const _current_page = ref(1)
const _current_size = ref(10)
const _search = ref('')
const _table_headers = ref<ITableHeader[]>([
    { title: 'Ext ID', prop: 'extId', width: 90 },
    { title: 'Full name', prop: 'fullName', width: '' },
    { title: 'IABS phone', prop: 'iabsMobilePhone', width: '' },
    { title: 'Login', prop: 'login', width: 90 },
    { title: 'DBO phone', prop: 'dboMobilePhone', width: '' },
    { title: 'Lock date', prop: 'lockDate', width: '' },
    { title: 'Lock reason', prop: 'lockReason', width: '' },
    { title: 'Notes', prop: 'notes', width: '' },
    { title: 'Last login Device', prop: 'lastLoginModelDevice', width: 120 },
  ]
)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped />