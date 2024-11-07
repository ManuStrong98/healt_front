import { Card } from '@/components/Card'
import { Error } from '@/components/Error'
import { Loading } from '@/components/Loading'
import { useGetBooksFavorites } from '@/hooks/useBooks'


export const LayoutContent = ({ title, disabled, content }) => {
  const favs = useGetBooksFavorites()
  const books = content.data?.data.books || []
  const favoriteIds = new Set(favs.data?.data.books.map((book) => book.id))

  const renderStatus = () => {
    if (content.isLoading || favs.isLoading)
      return <Loading />
    if (content.error || favs.error)
      return <Error>No se obtuvieron resultados satisfactorios</Error>
    if (books.length === 0)
      return <p className='text-lg font-semibold'>No se encontraron resultados</p>
    return null
  }

  return (
    <div className='flex flex-col'>
      <section className='py-4'>
        <h2 className='text-2xl font-bold'>{title}</h2>
      </section>

      {renderStatus() || (
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:5 gap-4 lg:gap-8'>
          {books.map((book) => (
            <Card key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              url_cover={book.cover_path}
              url_audio={book.audio_path}
              categories={book.categories}
              disabled={disabled}
              isFav={favoriteIds.has(book.id)}
            />
          ))}
        </section>
      )}
    </div>
  )
}
