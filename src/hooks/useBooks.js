import {
  deleteFavorite,
  getBookById,
  getBooks,
  getBooksByCategorie,
  getBooksBySearch,
  getBooksBySection,
  getBooksFavorites,
  getBooksFavoritesBySearch,
  getCategorie,
  getCategories,
  getComments,
  postComment,
  postFavorite,
  postQualification,
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

export const usePostQualification = (id_content) => useMutation({
  mutationFn: ({ qualification }) => postQualification(id_content, qualification),
  onSuccess: () => queryClient.invalidateQueries(['book', id_content]),
})

export const useGetComments = (id_content) => useQuery({
  queryKey: ['book', 'comments', id_content],
  queryFn: () => getComments(id_content),
  enabled: !!id_content,
})

export const usePostComment = (id_content) => useMutation({
  mutationFn: ({ message }) => postComment(id_content, message),
  onSuccess: () => queryClient.invalidateQueries(['books', 'comments', id_content]),
})

export const useGetCategories = () => useQuery({
  queryKey: ['books', 'categories'],
  queryFn: getCategories,
})

export const useGetBooksByCategorie = (categorie) => useQuery({
  queryKey: ['books', 'categories', categorie],
  queryFn: () => getBooksByCategorie(categorie),
})

export const useGetCategorie = (id) => useQuery({
  queryKey: ['categorie', id],
  queryFn: () => getCategorie(id),
})
