import axios, { type AxiosInstance } from 'axios'
import { ElNotification } from 'element-plus'

const $api: AxiosInstance = axios.create({
  baseURL: 'http://10.10.115.132:8082/api/v1'
})

$api.interceptors.request.use((config) => {
  const token: string | null = localStorage.getItem('_token')

  if (config.url !== '/login') {
    config.headers['Authorization'] = `Bearer ${token}`
  } else delete config.headers['Authorization']
  return config
})

const notifyError = (message: string) => {
  ElNotification({
    title: 'Error',
    message: message,
    type: 'error',
    duration: 5500
  })
}

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.info || 'An unexpected error occurred'
    const bad_request = error?.response?.status
    const bad_request_msg = error?.message

    if (status === 403 || status === 401) {
      notifyError('Iltimos platformaga qaytadan kiring!')
      // localStorage.clear()
      location.href = '/login'
    } else if (bad_request === 403) {
      notifyError(bad_request_msg)
    } else {
      notifyError(message)
    }

    return Promise.reject(error)
  }
)

export default $api
