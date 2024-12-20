import { Howl } from 'howler'
import { create } from 'zustand'


const audioStore = create((set) => ({
  currentAudio: null,
  howl: null,
  isPlaying: false,
  playbackPosition: 0.1,
  volume: 100,
  muted: false,
  duration: 0,
  isOpenDescription: false,

  setCurrentAudio: (audio, progress=0.1) => set((state) => {
    state.howl?.unload()

    const newHowl = new Howl({
      src: [audio.url],
      volume: state.volume / 100,
      onload: () => {
        const audioDuration = newHowl.duration()
        set({ duration: audioDuration })
      },
      onend: () => set({ isPlaying: false, playbackPosition: progress }),
    })

    return { currentAudio: audio, howl: newHowl, playbackPosition: 0 }
  }),

  setPlaying: (value) => set({ isPlaying: value }),

  togglePlay: () => set((state) => {
    if (state.isPlaying) {
      state.howl?.pause()
    } else {
      state.howl?.play()
    }
    return { isPlaying: !state.isPlaying }
  }),

  setDuration: (duration) => set({ duration }),

  setPosition: (position) => set((state) => {
    state.howl?.seek(position)
    return { playbackPosition: position }
  }),

  setVolume: (volume) => set((state) => {
    state.howl?.volume(volume / 100)
    return { volume }
  }),

  toggleMuted: () => set((state) => {
    const isMuted = !state.muted
    state.howl?.mute(isMuted)
    return { muted: isMuted }
  }),

  startAudio: (progress) => set((state) => {
    if (progress)state.howl?.seek(progress)
    state.howl?.play()
    state.howl?.mute(state.muted)
    return { isPlaying: true }
  }),

  logoutAudio: () => set((state) => {
    state.howl?.unload()
    return { currentAudio: {}, isPlaying: false, playbackPosition: 0.1, duration: 0 }
  }),

  toggleOpenDescription: () => set((state) => ({ isOpenDescription: !state.isOpenDescription })),

  setIsOpenDescription: (value) => set({ isOpenDescription: value }),
}))

export default audioStore

