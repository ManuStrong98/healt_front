import { LayoutContent } from '@/layouts/LayoutContent'
import { useLocation } from 'react-router-dom'


export const Home = () => {
  const { search } = useLocation()
  const query = search.split('=')[1]

  return !search ? (
    <LayoutContent title='Sugerencias' section='sugerencias' />
  ) : (
    <LayoutContent title='Resultados' search={query} />
  )
}
