<template>
  <div>
    <el-card shadow="never" style="border: none">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2>Мониторинг зарегистрированных клиентов</h2>
        <el-input
          v-model="_search"
          placeholder="Search"
          style="width: 250px;"
          :suffix-icon="Search"
        />
      </div>
      <el-table
        :data="_clients_list"
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
          layout="total, sizes, prev, pager, next, slot"
          :total="_total_elements"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore } from '@/stores/clients.pinia'
import { storeToRefs } from 'pinia'
import { Search } from '@element-plus/icons-vue'
import type { ITableHeader } from '@/types/table'

const { getClientList } = useClientsStore()
const { _clients_list, _table_loader, _total_elements } = storeToRefs(useClientsStore())

getClientList({page: 0, size: 20})

const _current_page = ref(0)
const _current_size = ref(20)
const _search = ref('')
const _table_headers = ref<ITableHeader[]>([
    { title: 'Customer ID', prop: 'customerId', width: '' },
    { title: 'Full name', prop: 'fullName', width: '' },
    { title: 'Filial', prop: 'filial', width: '' },
    { title: 'Login', prop: 'login', width: '' },
    { title: 'SmsPhone', prop: 'mobilePhone', width: '' },
    { title: 'Last login time', prop: 'lastLoginTime', width: '' },
    { title: 'Gender', prop: 'gender', width: 90 },
    { title: 'Date of birth', prop: 'dateOfBirth', width: '' },
    { title: 'Passport', prop: 'passport', width: '' },
    { title: 'Doc given place', prop: 'docGivenPlace', width: 250 }
  ]
)

const handleSizeChange = (val: number) => {
  getClientList({
    page: _current_page.value,
    size: val,
  })
}
const handleCurrentChange = (val: number) => {
  getClientList({
    page: val-1,
    size: _current_size.value
  })

}
</script>

<style lang="scss" scoped />