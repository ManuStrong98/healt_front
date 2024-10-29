import { LayoutContent } from '@/layouts/LayoutContent'
import { useLocation } from 'react-router-dom'


export const Home = () => {
  const { search } = useLocation()
  const query = search.split('=')[1]

  return !search ? (
    <LayoutContent
      title='Sugerencias'
      url='https://health-production-6b96.up.railway.app/api/book/?section=sugerencias'
    />
  ) : (
    <LayoutContent
      title='Resultados'
      url={`https://health-production-6b96.up.railway.app/api/book?search=${query}`}
    />
  )
}
