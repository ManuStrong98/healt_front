import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RecoveryContext } from '../pages/RecoveryPassword'


const Email = () => {
  const { email, setPage, otp } = useContext(RecoveryContext)
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0])
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (parseInt(OTPinput.join('')) === otp) setPage('Recover')
    else setError('El código no coincide.')
  }

  const handleSetOTP = (e, idx) => {
    const arr = OTPinput
    arr[idx] = e.target.value
    setError('')
    setOTPinput(arr)
  }

  return (
    <div className='grid gap-2 max-w-2xl w-full mx-auto'>
      <div className='flex justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>Verificacion de Email</h2>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='otp' className='block text-sm font-medium text-gray-700 pb-2'>
                Nosotros enviamos un codigo al email {email}
              </label>

              <div className='flex flex-col space-y-16'>
                <div className='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
                  <div className='w-16 h-16 '>
                    <input
                      maxLength='1'
                      className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-htc-blue'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => handleSetOTP(e, 0)}
                    ></input>
                  </div>
                  <div className='w-16 h-16 '>
                    <input
                      maxLength='1'
                      className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => handleSetOTP(e, 1)}
                    ></input>
                  </div>
                  <div className='w-16 h-16 '>
                    <input
                      maxLength='1'
                      className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => handleSetOTP(e, 2)}
                    ></input>
                  </div>
                  <div className='w-16 h-16 '>
                    <input
                      maxLength='1'
                      className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                      type='text'
                      name=''
                      id=''
                      onChange={(e) => handleSetOTP(e, 3)}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            {error && <small className='text-red-600 flex justify-center'>{error}</small>}

            <button
              type='submit'
              className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            >
              Reestablecer Contraseña
            </button>
          </form>
        </div>
      </div>
      <div className='text-sm text-center'>
        <span>¿No tienes una cuenta? Crea una </span>
        <Link to='/register' className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'>
          aquí
        </Link>
      </div>
    </div>
  )
}

export default Email