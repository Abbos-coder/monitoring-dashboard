import { defineStore } from 'pinia'
import {ref} from 'vue'
import $api from '@/composables/useAxios'

export const useDeactivatedClients = defineStore('deactivated-clients', () => {
  const _deactivated_clients = ref<never[]>([])
  const _table_loader = ref<boolean>(false)

  const getDeactivatedClients = () => {
    _table_loader.value = true
    $api.get('/archived-user-list?page=0&size=20')
      .then((response) => {
        _table_loader.value = false
        _deactivated_clients.value = response.data.content
      }).catch(() => _table_loader.value = false)
  }

  return {
    _deactivated_clients,
    _table_loader,

    getDeactivatedClients,
  }
})