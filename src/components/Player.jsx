import { PlayerActions } from '@/components/PlayerActions'
import { PlayerControls } from '@/components/PlayerControls'
import { PlayerInfo } from '@/components/PlayerInfo'
import { useGetProgress } from '@/hooks/useProgress'
import audioStore from '@/store/audioStore'
import { useEffect } from 'react'


export const Player = () => {
  const { setCurrentAudio, currentAudio, setPosition } = audioStore()
  const { data, isLoading } = useGetProgress()
  const audio = data?.data || {}

  useEffect(() => {
    if (currentAudio?.id) return

    const initialAudio = {
      id: audio.id || null,
      title: audio.title || 'Unknow Title',
      author: audio.author || 'Unknow Author',
      cover: audio.cover || null,
      url: audio.url || null
    }

    setCurrentAudio(initialAudio, 0)
    setPosition(audio.progress || 0)
  }, [setCurrentAudio, setPosition, data])

  if (isLoading) {
    return null
  }

  return (
    <div className='h-full mx-3 flex items-center lg:mx-16'>
      <div className='w-4/5 lg:w-3/12'>
        <PlayerInfo />
      </div>

      <div className='w-1/6 lg:w-1/2'>
        <PlayerControls />
      </div>

      <div className='hidden lg:block lg:w-3/12'>
        <PlayerActions />
      </div>
    </div>
  )
}
