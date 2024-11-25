import { Modal } from '@/components/Modal'
import { useRegister } from '@/hooks/useRegister'
import authStore from '@/store/authStore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Register = () => {
  const [formData, setFormData] = useState({
    name: '', lastname: '', email: '', userName: '', profile: null, password: '', confirmPassword: ''
  })
  const { isAuthenticated } = authStore()
  const navigate = useNavigate()
  const { mutate: register, error, isPending, isSuccess } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedConditions, setAcceptedConditions] = useState(false)
  const [viewConditions, setViewConditions] = useState(false)
  const [errors, setErrors] = useState({})
  const [errorState, setErrorState] = useState({})

  const openModal = () => setViewConditions(true)
  const closeModal = () => setViewConditions(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess])

  useEffect(() => {
    setErrorState(error ? error : {})
  }, [error])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrorState({})

    if (name === 'name' || name === 'lastname') {
      const nameRegex = /^[a-zA-Z\s]+$/
      setErrors({
        ...errors,
        [name]: nameRegex.test(value) ? '' : 'Solo se permiten letras y espacios',
      })
    } else if(name === 'userName'){
      const userNameRegex = /^[a-zA-Z0-9_]+$/
      setErrors({
        ...errors,
        [name]: userNameRegex.test(value) ? '' : 'El nombre de usuario solo puede contener letras, números y guiones bajos',
      })
      setErrors({
        ...errors,
        [name]:  value.length <= 15? '' : 'El nombre de usuario es demasiado grande',
      })
      setErrors({
        ...errors,
        [name]:  value.length >= 4? '' : 'El nombre de usuario es demasiado pequeño',
      })
      
    }else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const allowedDomains = ['hotmail.com','gmail.com','yahoo.com','outlook.com'];
      const domain=value.split('@')[1];
      
      if (!emailRegex.test(value)) {
        setErrors({
          ...errors,
          email: 'Formato de correo inválido',
        });
      } else if (!allowedDomains.includes(domain)) {
        setErrors({
          ...errors,
          email: 'Dominio de correo no permitido',
        });
      } else {
        setErrors({
          ...errors,
          email: '',
        });
      }

    } else {
      setErrors({})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!errors.name && !errors.lastname && !errors.email && !errors.userName) {
      register(formData)
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
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>Registro de Usuarios</h2>
            <form className='space-y-5' onSubmit={handleSubmit}>
              <div className='flex flex-col md:flex-row gap-6 w-full'>
                <div className='w-full'>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                    Nombre(s) <span className='text-red-500 font-bold'>*</span>
                  </label>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    required
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Ingrese su/s nombre/s'
                    onChange={handleChange}
                  />
                  {errors.name && <small className='text-red-600'>{errors.name}</small>}
                </div>

                <div className='w-full'>
                  <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>
                    Apellido(s)
                  </label>
                  <input
                    id='lastname'
                    type='text'
                    name='lastname'
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Ingrese su/s apellido/s'
                    onChange={handleChange}
                  />
                  {errors.lastname && <small className='text-red-600'>{errors.lastname}</small>}
                </div>
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Correo Electrónico <span className='text-red-500 font-bold'>*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su correo'
                  onChange={handleChange}
                />
                {errors.email && <small className='text-red-600'>{errors.email}</small>}
                {errorState && errorState.status === 409 && (
                  <small className='text-red-600'>{error.response.data.message}</small>
                )}
              </div>
              
              <div>
                <label htmlFor='userName' className='block text-sm font-medium text-gray-700'>
                  Nombre de Usuario: <span className='text-red-500 font-bold'>*</span>
                </label>
                <input
                  id='userName'
                  type='text'
                  name='userName'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese un nombre de usuario'
                  onChange={handleChange}
                />
                {errors.userName && <small className='text-red-600'>{errors.userName}</small>}
                {errorState && errorState.status === 402 && (
                  <small className='text-red-600'>{error.response.data.message}</small>
                )}
              </div>

              <div className='relative'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Contraseña <span className='text-red-500 font-bold'>*</span>
                </label>

                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    required
                    className='mt-1 w-full pl-3 pr-9 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
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

                {errorState && errorState.status === 400 && (
                  <small className='text-red-600'>{error.response.data.message}</small>
                )}
              </div>

              <div className='relative'>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                  Confirmar Contraseña <span className='text-red-500 font-bold'>*</span>
                </label>

                <div className='relative'>
                  <input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    name='confirmPassword'
                    className='mt-1 w-full pl-3 pr-9 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
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

              <div className='flex items-center'>
                <input
                  id='checkbox-acceptedConditions'
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer'
                  onClick={(e) => { setAcceptedConditions(e.target.checked) }}
                />
                <label htmlFor='checkbox' className='ms-2 text-sm font-medium'>
                  Aceptar
                  <button
                    type='button'
                    className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue ml-1'
                    onClick={openModal}
                  >Términos y Condiciones</button>
                </label>
              </div>

              <button
                type='submit'
                className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-40'
                disabled={
                  formData.password !== formData.confirmPassword ||
                  isPending || !acceptedConditions ||
                  errors.name || errors.lastname || errors.email
                }
              >
                {isPending ? 'Registrandose...' : 'Registrarse'}
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

      {viewConditions && (
        <Modal onClose={closeModal} title='Términos y Condiciones'>
          <ul className='max-w-md space-y-1 list-disc list-inside'>
            <li>
              <span className='font-semibold'>Propósito del Servicio: </span>Este sistema ofrece acceso a audiolibros enfocados en la prevención, cuidado e información sobre salud y bienestar. Su propósito es brindar información educativa y de concienciación.
            </li>
            <li>
              <span className='font-semibold'>Uso Personal y No Comercial: </span>Los usuarios reciben una licencia limitada, personal y no transferible para acceder al contenido. No está permitido distribuir, reproducir o vender los audiolibros, ni utilizarlos con fines comerciales sin autorización previa.
            </li>
            <li>
              <span className='font-semibold'>No Sustitución de Consejos Médicos: </span>El contenido proporcionado es solo para fines informativos y no reemplaza el asesoramiento, diagnóstico o tratamiento profesional. Consulte a un médico o profesional de la salud para cualquier consulta médica.
            </li>
            <li>
              <span className='font-semibold'>Responsabilidad del Usuario: </span>Es responsabilidad del usuario consultar a un profesional de la salud antes de implementar cualquier práctica o recomendación mencionada en los audiolibros. El sistema no se hace responsable de decisiones tomadas en base a su contenido.
            </li>
            {/* <li>
              <span className='font-semibold'>Privacidad y Protección de Datos: </span>La privacidad de nuestros usuarios es prioritaria. La información personal recopilada se maneja conforme a normativas vigentes como el GDPR o la CCPA, especialmente en caso de datos sensibles. Para más detalles, consulte nuestra Política de Privacidad.
            </li> */}
            <li>
              <span className='font-semibold'>Propiedad Intelectual: </span>Todo el contenido, incluidos los audiolibros y material visual, es propiedad exclusiva de la plataforma o sus creadores. Está prohibida cualquier reproducción, distribución o uso sin el permiso correspondiente.
            </li>
            <li>
              <span className='font-semibold'>Modificaciones en el Servicio: </span>Nos reservamos el derecho de modificar los términos, funcionalidades o características del servicio. Cualquier cambio significativo se notificará a los usuarios de forma oportuna.
            </li>
            <li>
              <span className='font-semibold'>Limitación de Responsabilidad: </span>La plataforma no se hace responsable de daños indirectos o consecuencias del uso indebido del contenido. Los usuarios son responsables de seguir las recomendaciones de salud oficiales y de sus propias decisiones.
            </li>
            <li>
              <span className='font-semibold'>Suspensión de Cuenta: </span>Cualquier uso indebido o violación de estos términos, como la reproducción no autorizada del contenido, puede resultar en la suspensión o cancelación de la cuenta del usuario.
            </li>
            {/* <li>
              <span className='font-semibold'>Política de Cancelación y Reembolsos: </span>En caso de una suscripción, el usuario puede cancelar en cualquier momento según los términos de cancelación. Las solicitudes de reembolso serán evaluadas conforme a las políticas vigentes en el momento de la solicitud.
            </li> */}
          </ul>
        </Modal>
      )}
    </div>
  )
}
