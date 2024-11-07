import axiosInstance from '@/api/axiosInstance'


export const getBookById = (id) => axiosInstance.get(`/books/${id}`)

export const getBooks = () => axiosInstance.get('/books')

export const getBooksBySection = (section) => axiosInstance.get(`/books/?section=${section}`)

export const getBooksBySearch = (query) => axiosInstance.get(`/books/?search=${query}`)

export const getBooksFavorites = () => axiosInstance.get('/books/favorites')

export const postFavorite = (id) => axiosInstance.post(`/books/favorites/${id}`)

export const deleteFavorite = (id) => axiosInstance.delete(`/books/favorites/${id}`)

export const postView = (id) => axiosInstance.post(`/books/${id}`)

export const getBooksFavoritesBySearch = (query) => axiosInstance.get(`/books/favorites/?search=${query}`)
