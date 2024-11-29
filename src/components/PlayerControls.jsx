import { ProgressBar } from '@/components/ProgressBar'
import audioStore from '@/store/audioStore'
import { useEffect, useRef } from 'react'
import { usePostProgress} from '../hooks/useProgress'

export const PlayerControls = () => {
  const {
    currentAudio,
    howl,
    duration,
    isPlaying,
    togglePlay,
    playbackPosition,
    setPosition
  } = audioStore()

  const { mutate: postProgress } = usePostProgress()
  
  const animationRef = useRef(null)
  const playbackRef = useRef(playbackPosition)

  useEffect(() => {
    if (!isPlaying || !currentAudio?.id) return
    const interval = setInterval(() => {
      postProgress({
        id_content: currentAudio.id,
        progress: playbackRef.current,
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, currentAudio?.id, howl])
  
  useEffect(() => {
    playbackRef.current = playbackPosition
  }, [playbackPosition])

  useEffect(() => {
    if (!isPlaying || !howl) return

    const updatePosition = () => {
      const currentPos = howl.seek() || 0
      playbackRef.current = currentPos
      if (Math.abs(currentPos - playbackPosition) > 0.5) {
        setPosition(currentPos)
      }

      animationRef.current = requestAnimationFrame(updatePosition)
    }

    animationRef.current = requestAnimationFrame(updatePosition)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, howl, setPosition, playbackPosition])

  const handleClickBar = (e) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newTime = ((clientX - left) / width) * duration
    setPosition(newTime)
    howl.seek(newTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
  }

  return (
    <div className='text-white lg:flex lg:flex-col lg:gap-1'>
      <section className='w-full flex justify-end text-4xl lg:text-3xl lg:justify-center lg:gap-8'>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.max(playbackPosition - 10, 0)) }}
          disabled={howl._state !== "loaded"}
        >
          <i className='bi bi-skip-backward'></i>
        </button>
        <button className='disabled:opacity-50'
          onClick={() => { togglePlay() }} disabled={howl._state !== "loaded"}
        >
          <i className={`bi bi-${isPlaying ? 'pause' : 'play'}-fill`}></i>
        </button>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.min(playbackPosition + 10, duration)) }}
          disabled={howl._state !== "loaded"}
        >
          <i className='bi bi-skip-forward'></i>
        </button>
      </section>

      <section className='hidden lg:flex gap-2 items-center justify-center'>
        <span>{formatTime(playbackPosition)}</span>
        <ProgressBar
          now={playbackPosition}
          max={duration}
          onClick={(e) => {if(howl._state === "loaded")handleClickBar(e)}}
        />
        <span>{formatTime(duration)}</span>
      </section>
    </div>
  )
}
