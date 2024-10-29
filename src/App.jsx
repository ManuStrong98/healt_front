import { ProtectedRoute } from '@/components/ProtecteddRoute'
import { useStore } from '@/hooks/useStore'
import { Layout } from '@/layouts/Layout'
import { ContentBook } from '@/pages/ContentBook'
import { Explore } from '@/pages/Explore'
import { Favorites } from '@/pages/Favorites'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from './pages/Register'
import { NotFound } from '@/pages/NotFound'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.min.css'



const App = () => {
  const { setCurrentAudio } = useStore()
  const { verifyToken } = useAuthStore()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (token) {
      verifyToken(token)
    }
  }, [])

  useEffect(() => {
    const initialAudio = {
      id: null,
      title: 'Unknow Title',
      author: 'Unknow Author',
      cover: null,
      url: null
    }

    setCurrentAudio(initialAudio)
  }, [setCurrentAudio])

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/register' element={<Register />} /> */}

        <Route element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/book/:id' element={<ContentBook />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
