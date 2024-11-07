import {
  deleteFavorite,
  getBookById,
  getBooks,
  getBooksBySearch,
  getBooksBySection,
  getBooksFavorites,
  getBooksFavoritesBySearch,
  postFavorite,
  postView,
} from '@/api/bookApi'
import authStore from '@/store/authStore'
import queryClient from '@/utils/queryClient'
import { useMutation, useQuery } from '@tanstack/react-query'


export const useGetBook = (id) => useQuery({
  queryKey: ['book', id],
  queryFn: () => getBookById(id),
  enabled: !!id,
})

export const useGetBooks = () => useQuery({
  queryKey: ['books'],
  queryFn: getBooks,
})

export const useGetBooksSearch = (query) => useQuery({
  queryKey: ['books', query],
  queryFn: () => getBooksBySearch(query),
  enabled: !!query,
})

export const useGetBooksSection = (section) => useQuery({
  queryKey: ['books', section],
  queryFn: () => getBooksBySection(section),
  enabled: !!section,
})

export const useGetBooksFavorites = () => {
  const { user: { id } } = authStore()

  return useQuery({
    queryKey: ['books', 'favorites', id],
    queryFn: getBooksFavorites,
  })
}

export const usePostBookFavorites = (id_content) => {
  const { user: { id } } = authStore()

  return useMutation({
    mutationFn: () => postFavorite(id_content),
    onSuccess: () => queryClient.invalidateQueries(['books', 'favorites', id]),
  })
}

export const useDeleteBookFavorites = (id_content) => {
  const { user: { id } } = authStore()

  return useMutation({
    mutationFn: () => deleteFavorite(id_content),
    onSuccess: () => queryClient.invalidateQueries(['books', 'favorites', id]),
  })  
}

export const useGetBooksFavoritesBySearch = (query) => useQuery({
  queryKey: ['books', 'favorites', query],
  queryFn: () => getBooksFavoritesBySearch(query),
  enabled: !!query,
})
