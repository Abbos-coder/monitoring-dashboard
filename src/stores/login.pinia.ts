import { defineStore } from 'pinia'
import $api from '@/composables/useAxios'
import type { ILogin } from '@/types/login'

export const useLoginStore = defineStore('loginStore', () => {
  const submitLogin = async (data: ILogin) => {
    await $api.post('/login', data, {
      headers: { 'Authorization': '' }
    })
      .then((res): void => {
        localStorage.setItem('_token', res.data.body)
      })
  }
  return {
    submitLogin
  }
})
