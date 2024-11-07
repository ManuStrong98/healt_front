import authStore from '@/store/authStore'
import { Navigate, useLocation } from 'react-router-dom'


export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = authStore()
  const { pathname: path } = useLocation()

  return isAuthenticated ? children : <Navigate to='/login' state={path} replace />
}
