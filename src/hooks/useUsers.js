import { putUpdatePassword } from '@/api/userApi'
import { useMutation } from '@tanstack/react-query'
import { updateProfile , putUpdatePasswordWithPassword } from '../api/userApi'


export const usePutUpdatePassword = () => useMutation({
  mutationFn: ({ email, password }) => putUpdatePassword(email, password),
})

export const useUpdateProfile = () => useMutation({
  mutationFn: ({actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero}) => updateProfile(actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero)
})

export const usePutUpdatePasswordWithPassword = () => useMutation({
  mutationFn: ({ email, password , newPassword}) => putUpdatePasswordWithPassword(email, password , newPassword),
})