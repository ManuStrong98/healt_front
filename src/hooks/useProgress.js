import { getProgress, postProgress, getProgressByContentId, getProgressAll } from '@/api/bookApi'
import authStore from '@/store/authStore'
import queryClient from '@/utils/queryClient'
import { useMutation, useQuery } from '@tanstack/react-query'


export const useGetProgress = () => {
  const { user: { id } } = authStore()

  return useQuery({
    queryKey: ['books', 'progress', id],
    queryFn: getProgress,
  })
}

export const useGetProgressByContentId = (id_contenido, enabled) => {
  const { user: { id } } = authStore()

  return useQuery({
    queryKey: ['books', 'progress', id, id_contenido],
    queryFn: () => getProgressByContentId(id_contenido),
    enabled: enabled
  })
}

export const useGetAllProgress = () => {
  const { user: { id } } = authStore()

  return useQuery({
    queryKey: ['books', 'progressAll', id],
    queryFn: () => getProgressAll(),
  })
}

export const usePostProgress = () => {
  const { user: { id } } = authStore()

  return useMutation({
    mutationFn: ({ id_content, progress }) => postProgress(id_content, progress),
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'progress', id])
      queryClient.invalidateQueries(['books', 'progressAll', id])
    },
  })
}
