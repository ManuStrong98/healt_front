import { putUpdatePassword } from '@/api/userApi'
import { useMutation } from '@tanstack/react-query'


export const usePutUpdatePassword = () => useMutation({
  mutationFn: ({ email, password }) => putUpdatePassword(email, password),
})
