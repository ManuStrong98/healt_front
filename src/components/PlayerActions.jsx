import { ProgressBar } from '@/components/ProgressBar'
import { useStore } from '@/hooks/useStore'
import { Howler } from 'howler'
import { useState } from 'react'


export const PlayerActions = () => {
  const {
    currentAudio,
    volume,
    setVolume,
    setPosition,
    muted,
    toggleMuted
  } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleVolumeBarClick = (e) => {
    if (muted) return

    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newVolume = (clientX - left) / width

    Howler.volume(Math.min(Math.max(newVolume, 0), 1))
    setVolume(newVolume * 100)
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
          onClick={() => { setIsOpen(!isOpen) }}
          disabled
        >
          <i className={`bi bi-caret-${isOpen ? 'down' : 'up'}-fill fs-1 text-light`}></i>
        </button>
      </div>
    </div>
  )
}
