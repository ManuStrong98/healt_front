import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useVerifyToken } from '@/hooks/useAuth'
import { Layout } from '@/layouts/Layout'
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
          <Route path='/explore' element={<Explore />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/book/:id' element={<ContentBook />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
