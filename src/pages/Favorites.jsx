import { useGetBooksFavorites } from '@/hooks/useBooks'
import { LayoutContent } from '@/layouts/LayoutContent'


export const Favorites = () => {
  const favorites = useGetBooksFavorites()

  return <LayoutContent title='Favoritos' content={favorites} />
}
