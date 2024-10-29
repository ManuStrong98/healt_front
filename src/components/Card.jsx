import { useStore } from '@/hooks/useStore'


export const Card = ({ id, title, author, url_cover, url_audio, categories, disabled }) => {
  const { setPlaying, setCurrentAudio, startAudio } = useStore()

  const handlePlay = () => {
    if (!disabled) {
      setCurrentAudio({ id, title, author, cover: url_cover, url: url_audio })
      startAudio()
      setPlaying(true)
    }
  }

  return (
    <button
      className={`group ${disabled && 'cursor-auto'}`}
      onClick={handlePlay}
    >
      <div className='aspect-square overflow-hidden'>
        <img
          className={`m-auto h-full ${!disabled && 'group-hover:scale-105 group-focus:scale-105 transition-transform duration-500'}`}
          src={url_cover}
          alt={`portada_${title}`}
        />
      </div>

      <div className='px-3 py-4'>
        <p className='font-bold text-base mb-2'>{title}</p>
        <p className='text-gray-700 text-xs'>{author}</p>
      </div>

      {!!categories && categories.length > 0 && (
        <div className='px-6 pt-4 pb-2'>
          {categories.map(({ nombre }, idx) => {
            return (
              <span key={`${nombre}-${idx}`}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
              >#{nombre}</span>
            )
          })}
        </div>
      )}
    </button>
  )
}
