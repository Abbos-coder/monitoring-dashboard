import { defineStore } from 'pinia'
import $api from '@/composables/useAxios'
import { ref } from 'vue'

interface IParams {
  page: number
  size: number
}

export const useClientsStore = defineStore('clientsStore', () => {
  const _clients_list = ref([])
  const _table_loader = ref<boolean>(false)
  const _total_elements = ref<number>(0)

  const getClientList = ({ page = 0, size = 20 }: IParams) => {
    _table_loader.value = true
    $api.get(`/user-list?page=${page}&size=${size}`)
      .then((response) => {
        _table_loader.value = false
        _clients_list.value = response.data.content
        _total_elements.value = response.data.totalElements
      })
      .catch(() => {
        _table_loader.value = false
      })
  }

  return {
    _clients_list,
    _table_loader,
    _total_elements,

    getClientList
  }
})
