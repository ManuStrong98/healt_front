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

export const getProgress = () => axiosInstance.get('/books/progress')

export const postProgress = (id_content, progress) => axiosInstance.post('/books/progress', { id_content, progress })

export const postQualification = (id_content, qualification) => axiosInstance.post('/books/qualification', { id_content, qualification })

export const getComments = (id_content) => axiosInstance.get(`/books/comments/${id_content}`)

export const postComment = (id_content, message) => axiosInstance.post('/books/comments', { id_content, message })

export const getCategories = () => axiosInstance.get('/books/categories')

export const getBooksByCategorie = (id) => axiosInstance.get(`/books/categories/${id}`)

export const getCategorie = (id) => axiosInstance.get(`/books/categorie/${id}`)
