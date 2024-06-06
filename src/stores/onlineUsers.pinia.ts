import { defineStore } from 'pinia'
import $api from '@/composables/useAxios'
import { ref } from 'vue'

export const useOnlineUsersStore = defineStore('onlineUsersStore', () => {

  const _online_users = ref([])
  const _table_loader = ref(false)

  const getOnlineUsers = async () => {
    _table_loader.value = true
    await $api.get('/liveusers').then((response) => {
      _online_users.value = response.data
      _table_loader.value = false
    })
      .catch((error) => {
        console.log(error)
        _table_loader.value = false
      })
  }

  return {
    _online_users,
    _table_loader,

    getOnlineUsers
  }
})
