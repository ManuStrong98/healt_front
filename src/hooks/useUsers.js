import { putUpdatePassword } from '@/api/userApi'
import { useMutation } from '@tanstack/react-query'
import { updateProfile , putUpdatePasswordWithPassword } from '../api/userApi'


export const usePutUpdatePassword = () => useMutation({
  mutationFn: ({ email, password }) => putUpdatePassword(email, password),
})

export const useUpdateProfile = () => useMutation({
  mutationFn: ({email, genero, nacimiento, pais, se_unio, number}) => updateProfile(email, genero, nacimiento, pais, se_unio, number)
})

export const usePutUpdatePasswordWithPassword = () => useMutation({
  mutationFn: ({ email, password , newPassword}) => putUpdatePasswordWithPassword(email, password , newPassword),
})