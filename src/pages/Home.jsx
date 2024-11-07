import { useGetBooks, useGetBooksFavoritesBySearch, useGetBooksSearch } from '@/hooks/useBooks'
import { LayoutContent } from '@/layouts/LayoutContent'
import { useLocation } from 'react-router-dom'


export const Home = () => {
  const { search, state } = useLocation()
  const query = search.split('=')[1]
  let title, books

  if (!search) {
    title = 'Sugerencias'
    books = useGetBooks()
  } else if (!state) {
    title = 'Resultados'
    books = useGetBooksSearch(query)
  } else {
    title = 'Resultados - Favoritos'
    books = useGetBooksFavoritesBySearch(query)
  }

  return <LayoutContent title={title} content={books} />
}
