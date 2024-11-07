import Email from '@/components/Email'
import OTP from '@/components/OTP'
import Recover from '@/components/Recover'
import { createContext, useState } from 'react'
import { Link } from 'react-router-dom'


export const RecoveryContext = createContext()

const RecoveryPassword = () => {
  const [page, setPage] = useState('Email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOtp, email, setEmail }}
    >
      <div className='flex items-center justify-center min-h-screen bg-gray-100 px-2 py-5'>
        <div className='grid gap-2 max-w-2xl w-full mx-auto'>
          <div className='flex justify-center'>
            <img src='/healthtone_black.svg' className='w-24' alt='logo-healthtone' />
          </div>

          <div className='text-4xl text-center'>
            <h1>
              Bienvenido a <br />
              <span className='text-htc-lightblue'>Healthtone</span>
            </h1>
          </div>

          {page === 'Email' && <Email />}
          {page === 'OTP' && <OTP />}
          {page === 'Recover' && <Recover />}

          {page !== 'OTP' &&
            <div className='text-sm text-center'>
              <span>¿No tienes una cuenta? Crea una </span>
              <Link to='/register' className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'>
                aquí
              </Link>
            </div>
          }
        </div>
      </div>
    </RecoveryContext.Provider>
  )
}

export default RecoveryPassword
