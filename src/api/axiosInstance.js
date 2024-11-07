import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: 'https://health-production-6b96.up.railway.app/api/v1',
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => Promise.reject(error))

export default axiosInstance
