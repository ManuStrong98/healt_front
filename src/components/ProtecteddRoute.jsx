import { useAuthStore } from '@/store/useAuthStore'
import { Navigate } from 'react-router-dom'


export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? children : <Navigate to='/login' replace />
}
