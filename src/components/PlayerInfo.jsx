import imgAux from '@/assets/med.jpg'
import { useStore } from '@/hooks/useStore'
import { Link } from 'react-router-dom'


export const PlayerInfo = () => {
  const { currentAudio } = useStore()

  return (
    <Link to={currentAudio.id && `/book/${currentAudio.id}`}>
      <div className='flex items-center justify-start gap-2 lg:w-10/12'>
        <img src={currentAudio.cover || imgAux}
          alt={`portada_${currentAudio.title}`}
          className='h-16'
        />

        <div className='overflow-hidden'>
          <p className='text-white font-bold text-base truncate'>
            {currentAudio.title}
          </p>
          <p className='text-gray-200 text-xs truncate'>
            {currentAudio.author}
          </p>
        </div>
      </div>
    </Link>
  )
}
