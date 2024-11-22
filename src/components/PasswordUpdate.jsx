import React, { useState, useEffect } from 'react'
import { usePutUpdatePasswordWithPassword } from '../hooks/useUsers'
import authStore from '../store/authStore'


const PasswordUpdate = ({ setOpen }) => {
  const { mutate: updatePassword, error, isSuccess, isPending } = usePutUpdatePasswordWithPassword()
  const { user } = authStore()
  const [errorState, setErrorState] = useState({})
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  useEffect(() => {
    setErrorState(error ? error : {})
  }, [error])

  useEffect(() => {
    if(isSuccess)setOpen(false)
  }, [isSuccess])

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevShow) => ({
      ...prevShow,
      [field]: !prevShow[field],
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (data.newPassword === data.confirmPassword) {
      updatePassword({
        email: user.email,
        password: data.currentPassword,
        newPassword: data.confirmPassword
      })
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Cambiar Contraseña</h3>
        <form onSubmit={onSubmit}>
          <div className="relative mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Contraseña Actual
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPassword.current ? 'text' : 'password'}
                name="currentPassword"
                value={data.currentPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Escribe tu contraseña actual"
              />
              <button
                type="button"
                className="absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center"
                onClick={() => togglePasswordVisibility('current')}
              >
                <i className={`bi bi-eye${showPassword.current ? '-slash' : ''}-fill`}></i>
              </button>
            </div>
          </div>
          <div className="relative mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Escribe tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center"
                onClick={() => togglePasswordVisibility('new')}
              >
                <i className={`bi bi-eye${showPassword.new ? '-slash' : ''}-fill`}></i>
              </button>
            </div>
            {errorState && errorState.status === 400 && (
              <small className='text-red-600'>{error.response.data.message}</small>
            )}
          </div>
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirma tu contraseña"
              />
              <button
                type="button"
                className="absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                <i className={`bi bi-eye${showPassword.confirm ? '-slash' : ''}-fill`}></i>
              </button>
            </div>
          </div>
          {errorState && errorState.status === 401 && (
              <small className='text-red-600'>{error.response.data.message}</small>
            )}
          {data.newPassword !== data.confirmPassword && (
            <small className='text-red-600'>La contraseña no coincide</small>
          )}
          {isSuccess?<small className='text-red-600'>Ha ocurrido un problema</small>:null}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-htc-blue hover:text-white"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-htc-blue hover:text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordUpdate
