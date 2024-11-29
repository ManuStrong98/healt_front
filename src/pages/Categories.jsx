import { Loading } from '@/components/Loading'
import { useGetBooks, useGetCategories } from '@/hooks/useBooks'
import { LayoutContent } from '@/layouts/LayoutContent'
import { Link } from 'react-router-dom'


export const Categories = () => {
  const books = useGetBooks()
  const { data, isLoading } = useGetCategories()

  const categories = data?.data.categories

  if (isLoading) {
    return <Loading />
  }

  return (
<>
  <h2 className='font-bold text-2xl mt-4'>Categorias</h2>

  {categories && (
    <div className='flex gap-1 mt-4 flex-wrap'>
      {categories.map(({ id, name }) => (
        <Link
          key={id}
          to={`/categories/${id}`}
          className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3 text-white hover:bg-htc-darkblue hover:bg-opacity-80 transition duration-300'
        >
          {name}
        </Link>
      ))}
    </div>
  )}

  <LayoutContent content={books} viewCategories />
</>

  )
}
