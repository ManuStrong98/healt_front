import { useStore } from '@/hooks/useStore'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const Card = ({ id, title, author, url_cover, url_audio, categories, disabled, isFav }) => {
  const { setPlaying, setCurrentAudio, startAudio, currentAudio } = useStore()
  const [iconHeart, setIconHeart] = useState(isFav)
  const isPlaying = currentAudio?.id === id

  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!disabled) {
      if (!isPlaying) setPlaying(true)

      setCurrentAudio({ id, title, author, cover: url_cover, url: url_audio })
      startAudio()
    }
  }

  const handleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const token = localStorage.getItem('access_token')

    await axios.post('https://health-production-6b96.up.railway.app/api/book/favorite', { id_content: id }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setIconHeart(!iconHeart)
  }

  return (
    <Link to={!disabled && `/book/${id}`}>
      <div className={`group ${disabled && 'cursor-auto'} relative group`}>
        <div className='aspect-square overflow-hidden relative'>
          <img
            className={`m-auto h-full ${!disabled && 'group-hover:scale-105 group-focus:scale-105 transition-transform duration-500'}`}
            src={url_cover}
            alt={`portada_${title}`}
          />
          {!disabled && (
            <button
              onClick={handlePlay}
              className={`absolute bottom-2 left-2 rounded-md p-2 transition-colors duration-300 hidden group-hover:block
                          ${isPlaying ? 'bg-htc-lightblue text-white' : 'bg-htc-white text-black'}
              `}
              style={{ width: '40px', height: '40px' }}
            >
              <div className="flex items-center justify-center h-full">
                <i className={isPlaying ? `bi bi-play-fill text-2xl` : `bi bi-play text-2xl`}></i>
              </div>
            </button>
          )}

          {!disabled && (
            <button
              onClick={handleFavorite}
              className={`absolute bottom-2 right-2 rounded-md p-2 transition-colors duration-300 hidden group-hover:block
                ${iconHeart ? 'bg-htc-lightblue text-white' : 'bg-htc-white text-black'}`}
              style={{ width: '40px', height: '40px' }}
            >
              <i className={iconHeart ? `bi bi-heart-fill text-lg` : `bi bi-heart text-lg`}></i>
            </button>
          )}
        </div>

        <div className='px-3 py-4'>
          <p className='font-bold text-base mb-2'>{title}</p>
          <p className='text-gray-700 text-xs'>{author}</p>
        </div>

        {!!categories && categories.length > 0 && (
          <div className='px-6 pt-4 pb-2'>
            {categories.map(({ nombre }, idx) => (
              <span
                key={`${nombre}-${idx}`}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
              >
                #{nombre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
