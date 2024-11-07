import { create } from 'zustand'


const authStore = create((set) => ({
  isAuthenticated: false,
  user: {},

  login: (user, token) => {
    localStorage.setItem('access_token', token)
    set({ isAuthenticated: true, user })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    set({ isAuthenticated: false, user: null })
  },
}))

export default authStore
