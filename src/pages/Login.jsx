import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ status: -1, message: null })
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://health-production-6b96.up.railway.app/api/auth/login', { email, password })
      localStorage.setItem('access_token', response.data.token)
      navigate('/')
      login(response.data.user)
    } catch ({ response: { status, data: { error } } }) {
      setError({
        status,
        message: error
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 py-5">
      <div className="grid gap-2 max-w-2xl w-full mx-auto">
        <div className="flex justify-center">
          <img src="/healthtone_black.svg" className="w-24" alt="logo-healthtone" />
        </div>

        <div className="text-4xl text-center">
          <h1>
            Bienvenido a <br />
            <span className="text-htc-lightblue">Healthtone</span>
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ingrese su correo"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.status === 404 && (
                  <p className='text-red-600'>{error.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ingrese su contraseña"
                  onChange={e => setPassword(e.target.value)}
                />
                {error.status === 401 && (
                  <p className='text-red-600'>{error.message}</p>
                )}
              </div>

              <div className="text-sm">
                <Link to="#" className="font-medium text-htc-lightblue hover:text-htc-blue">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>

        <div className="text-sm text-center">
          <span>¿No tienes una cuenta? Crea una </span>
          <Link to="/register" className="font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue">
            aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
