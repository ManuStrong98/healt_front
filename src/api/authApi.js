import axiosInstance from '@/api/axiosInstance'


export const postLogin = (email, password) =>
  axiosInstance.post('/auth/login', { email, password })

export const postRegister = (name, lastname, email, password) =>
  axiosInstance.post('/auth/register', { name, lastname, email, password })

export const getVerifyToken = () => axiosInstance.get('/users/profile')

export const sendEmail = (recipient_email, OTP) => axiosInstance.post('/auth/send_recovery_email', { recipient_email, OTP })
