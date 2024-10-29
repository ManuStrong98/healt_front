import { useStore } from '@/hooks/useStore'
import { Layout } from '@/layouts/Layout'
import { ContentBook } from '@/pages/ContentBook'
import { Explore } from '@/pages/Explore'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


const App = () => {
  const { setCurrentAudio } = useStore()

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

        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          {/* <Route path='/book/:id' element={<ContentBook />} /> */}

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
