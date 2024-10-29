import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('https://health-production-6b96.up.railway.app/api/auth/register', { name, email, password })
      setError(null)
      navigate('/')
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-2 py-5'>
      <div className='grid gap-2 max-w-2xl w-full mx-auto'>
        <div className='flex justify-center'>
          <img src='/healthtone_black.svg' className='w-16' alt='logo-healthtone' />
        </div>

        <div className='text-4xl text-center'>
          <h1>
            Bienvenido a <br />
            <span className='text-htc-lightblue'>Healthtone</span>
          </h1>
        </div>

        <div className='flex justify-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center mb-6'>Registro de Usuarios</h2>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Nombre
                </label>
                <input
                  id='name'
                  type='text'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su nombre'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Correo Electrónico
                </label>
                <input
                  id='email'
                  type='email'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su correo'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Contraseña
                </label>
                <input
                  id='password'
                  type='password'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su contraseña'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                  Confirmar Contraseña
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Confirme su contraseña'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password !== confirmPassword && (
                  <p className='text-red-600'>La contraseña no coincide</p>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-40'
                disabled={password !== confirmPassword}
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>

        <div className='text-sm text-center'>
          <span>¿Ya tienes una cuenta? Inicia sesión </span>
          <Link
            to='/login'
            className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'
          >
            aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
