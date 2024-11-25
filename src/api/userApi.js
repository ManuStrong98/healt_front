import axiosInstance from '@/api/axiosInstance'

export const putUpdatePassword = (email, password) => axiosInstance.put('/users/update-password', { email, password })

export const updateProfile = (actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero) => axiosInstance.put('/users/updateProfile',  {actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero})

export const putUpdatePasswordWithPassword = (email, password, newPassword) => axiosInstance.put('/users/update-password-withPassword', {email, password, newPassword})