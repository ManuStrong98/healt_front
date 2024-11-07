import { usePutUpdatePassword } from '@/hooks/useUsers'
import { RecoveryContext } from '@/pages/RecoveryPassword'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Recover = () => {
  const { email } = useContext(RecoveryContext)
  const [formData, setFormData] = useState({ email, password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { mutate: updatePassword, error, isSuccess, isPending } = usePutUpdatePassword()
  const [errorPassword, setErrorPassword] = useState('')

  useEffect(() => {
    if (isSuccess) navigate('/login')
  }, [isSuccess])

  useEffect(() => {
    if (error) setErrorPassword(error.response.data.message)
  }, [error])

  const handleChange = (e) => {
    const { name, value } = e.target
    setErrorPassword('')
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updatePassword(formData)
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Reestablecer Contraseña</h2>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Ingrese la nueva contraseña
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                required
                className='mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                placeholder='Ingrese su contraseña'
                onChange={handleChange}
              />
              <button
                type='button'
                className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}-fill`}></i>
              </button>
            </div>

            {errorPassword && (
              <small className='text-red-600'>{errorPassword}</small>
            )}
          </div>

          <div className='relative'>
            <label htmlFor='passwordConfirmation' className='block text-sm font-medium text-gray-700'>
              Confirme la contraseña
            </label>

            <div className='relative'>
              <input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                required
                className='mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                placeholder='Confirme su contraseña'
                onChange={handleChange}
              />
              <button
                type='button'
                className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}-fill`}></i>
              </button>
            </div>

            {formData.password !== formData.confirmPassword && (
              <small className='text-red-600'>La contraseña no coincide</small>
            )}
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            disabled={formData.password !== formData.confirmPassword || isPending}
          >
            {isPending ? 'Reestableciendo...' : 'Reestablecer'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Recover
