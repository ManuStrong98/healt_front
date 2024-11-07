import { postRegister } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'


export const useRegister = () => useMutation({
  mutationFn: ({ name, lastname, email, password }) => postRegister(name, lastname, email, password),
})
