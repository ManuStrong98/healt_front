import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useVerifyToken } from '@/hooks/useAuth'
import { Layout } from '@/layouts/Layout'
import { Categorie } from '@/pages/Categorie'
import { Categories } from '@/pages/Categories'
import { ContentBook } from '@/pages/ContentBook'
import { Explore } from '@/pages/Explore'
import { Favorites } from '@/pages/Favorites'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import RecoveryPassword from '@/pages/RecoveryPassword'
import { Register } from '@/pages/Register'
import authStore from '@/store/authStore'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import Profile from './pages/Profile'


export const App = () => {
  const { data, isSuccess } = useVerifyToken()
  const { login } = authStore()

  useEffect(() => {
    if (isSuccess) login(data.data.user, data.data.token)
  }, [data])

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recoveryPassword' element={<RecoveryPassword />} />

        <Route element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:categorie' element={<Categorie />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/book/:id' element={<ContentBook />} />
          <Route path='/user' element={<Profile />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
