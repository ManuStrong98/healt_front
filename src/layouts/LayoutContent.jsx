import { Card } from '@/components/Card'
import { useGet } from '@/hooks/useGet'


export const LayoutContent = ({ title, url, section='' }) => {
  const [content, error] = useGet(url)
  const [favs] = useGet('https://health-production-6b96.up.railway.app/api/book/favorites')

  if (!favs) return null

  return (
    <div className='flex flex-col'>
      <section className='py-4'>
        <h2 className='text-2xl font-bold'>{title}</h2>
      </section>

      {!!error ? (
        <p className='font-semibold text-red-600'>
          No se logro recupear la información
        </p>
      ) : !!content && content.length === 0 ? (
        <p className='font-semibold'>
          No se encontraron resultados
        </p>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:5 gap-8'>
          {!!content && content.map((book) => {
            return (
              <div key={book.id}
                className='border shadow-sm rounded-xl hover:shadow-lg transition'
              >
                <Card id={book.id}
                  title={book.nombre}
                  author={book.autor}
                  url_cover={book.url_portada}
                  url_audio={book.url_audio}
                  categories={book.categorias}
                  disabled={section == 'proximos_lanzamientos'}
                  isFav={favs && !!favs.find(b => b.id === book.id)}
                />
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
