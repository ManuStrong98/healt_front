import { Loading } from '@/components/Loading'
import { useGetBooksByCategorie, useGetCategorie } from '@/hooks/useBooks'
import { LayoutContent } from '@/layouts/LayoutContent'
import { useParams } from 'react-router-dom'


export const Categorie = () => {
  const { categorie: id } = useParams()
  const books = useGetBooksByCategorie(id)
  const { data, isLoading } = useGetCategorie(id)

  const categorie = data?.data

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <h2 className='font-bold text-2xl mt-4'>{categorie.name}</h2>
      <p className='mt-4'>{categorie.description}</p>
      <LayoutContent content={books} />
    </>
  )
}

