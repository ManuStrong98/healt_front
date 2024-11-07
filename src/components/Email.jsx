import { useContext, useEffect } from 'react'
import { useSendEmail } from '@/hooks/useSendEmail'
import { RecoveryContext } from '@/pages/RecoveryPassword'


const Email = () => {
  const { setEmail, email, setPage, setOtp } = useContext(RecoveryContext)
  const { mutate: sendEmail, error, isPending, isSuccess } = useSendEmail()

  useEffect(() => {
    if (isSuccess) setPage('OTP')
  }, [isSuccess])

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const OTP = Math.floor(Math.random() * 9000 + 1000)
    sendEmail({ recipient_email: email, OTP })
    setOtp(OTP)
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Recuperar Contraseña</h2>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Ingrese el correo electronico de la cuenta que desea recuperar
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              required
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Ingrese su correo'
              onChange={handleChange}
            />
          </div>

          {error && (
            <small className='text-red-600 flex justify-center'>{error.response.data.message}</small>
          )}

          <button
            type='submit'
            className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            disabled={isPending}
          >
            {isPending ? 'Recuperar Contraseña...' : 'Recuperar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Email
