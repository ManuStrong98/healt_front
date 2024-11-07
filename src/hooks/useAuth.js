import { getVerifyToken, postLogin } from '@/api/authApi'
import authStore from '@/store/authStore'
import { useMutation, useQuery } from '@tanstack/react-query'


export const useLogin = () => {
  const { login } = authStore()

  return useMutation({
    mutationFn: ({ email, password }) => postLogin(email, password),
    onSuccess: ({ data }) => {
      login(data.user, data.token)
    },
  })
}

export const useVerifyToken = () => useQuery({
  queryKey: ['verifyToken'],
  queryFn: getVerifyToken,
})
