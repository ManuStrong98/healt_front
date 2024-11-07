import { ProgressBar } from '@/components/ProgressBar'
import audioStore from '@/store/audioStore'
import { Howler } from 'howler'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export const PlayerActions = () => {
  const {
    currentAudio,
    volume,
    setVolume,
    setPosition,
    muted,
    toggleMuted,
    isOpenDescription,
    setIsOpenDescription,
    toggleOpenDescription,
  } = audioStore()
  const navigate = useNavigate()
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (pathname.split('/')[1] === 'book') {
      setIsOpenDescription(true)
      navigate(pathname, { state: '/' })
    }
  }, [])

  const handleVolumeBarClick = (e) => {
    if (muted) return

    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newVolume = (clientX - left) / width

    Howler.volume(Math.min(Math.max(newVolume, 0), 1))
    setVolume(newVolume * 100)
  }

  const handleOpen = () => {
    toggleOpenDescription()
    navigate(isOpenDescription
      ? state || '/'
      : `/book/${currentAudio.id}`
      , { state: pathname })
  }

  return (
    <div className='flex w-full text-white text-3xl justify-end'>
      <div className='flex justify-between w-9/12 gap-3'>
        <button className='disabled:opacity-50'
          onClick={() => { setPosition(0) }}
          disabled={!currentAudio.id}
        >
          <i className='bi bi-arrow-counterclockwise'></i>
        </button>

        <div className='flex items-center gap-2 w-full'>
          <button onClick={() => { toggleMuted() }}>
            <i className={`bi bi-volume-${muted || volume < 5 ? 'mute' : 'up'}-fill`}></i>
          </button>
          <ProgressBar
            now={muted ? 0 : volume}
            max={100}
            onClick={handleVolumeBarClick}
          />
        </div>

        <button
          className='disabled:opacity-50'
          onClick={handleOpen}
          disabled={!currentAudio.id}
        >
          <i className={`bi bi-caret-${isOpenDescription ? 'down' : 'up'}-fill fs-1 text-light`}></i>
        </button>
      </div>
    </div>
  )
}
