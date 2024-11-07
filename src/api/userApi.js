import axiosInstance from '@/api/axiosInstance'


export const putUpdatePassword = (email, password) => axiosInstance.put('/users/update-password', { email, password })
