import { Card } from '@/components/Card'
import { Comments } from '@/components/Comments'
import { EpubViewer } from '@/components/EpubViewer'
import { Error } from '@/components/Error'
import { Loading } from '@/components/Loading'
import { Qualification } from '@/components/Qualification'
import { useGetBook, useGetBooksFavorites } from '@/hooks/useBooks'
import audioStore from '@/store/audioStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProgressByContentId } from '../hooks/useProgress'


export const ContentBook = () => {
  const { id } = useParams()
  const [isReading, setIsReading] = useState(false)
  const { currentAudio, setCurrentAudio } = audioStore()
  const { data, isLoading, error } = useGetBook(id)
  const favoritos = useGetBooksFavorites()
  const [viewQualification, setViewQualification] = useState(false)
  const {data: dataProgress} = useGetProgressByContentId(id)

  const book = data?.data
  const favs = new Set(favoritos.data?.data.books.map((book) => book.id))

  useEffect(() => {
    if (!currentAudio?.id && !!book) {
      setCurrentAudio({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover_path,
        url: book.audio_path
      },dataProgress)
    }
  }, [book])

  const toggleReading = () => {
    setIsReading(!isReading)
  }

  if (isLoading || favoritos.isLoading)
    return <Loading />
  if (error)
    return <Error>{error.response.data.message}</Error>
  if (favoritos.error) {
    return <Error>{favoritos.error.response.data.message}</Error>
  }

  return (
    <div className='h-full flex flex-col items-center justify-evenly gap-2 pt-4'>
      {!!book && (
        <>
          <section className='flex flex-col items-center justify-center w-11/12 h-full lg:w-full lg:flex-row'>
            <div className={`mx-auto ${isReading && 'hidden'}`}>
              <Card id={book.id}
                title={book.title}
                author={book.author}
                url_cover={book.cover_path}
                url_audio={book.audio_path}
                isFav={favs.has(book.id)}
                isContent
                rating={book.rating}
              />
            </div>
            <div className={`${!isReading && 'hidden'} w-full mx-auto h-full lg:block`}>
              <EpubViewer url={book.text_path} />
            </div>
          </section>

          <section className='w-full flex justify-between items-center text-xl text-white pb-5 flex-wrap gap-2'>
            <button
              className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => setViewQualification(true)}
            >
              <i className='bi bi-star-fill'></i>
              <small>Calificar</small>
            </button>

            <button
              className='lg:hidden flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => toggleReading()}
            >
              <i className='bi bi-book-fill'></i>
              <small>Leer</small>
            </button>
          </section>

          <Comments id_content={id} />
        </>
      )}

      {viewQualification && (
        <Qualification
          id={id}
          setView={setViewQualification}
          initValue={book.rating || 0}
        />
      )}
    </div>
  )
}
