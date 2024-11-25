import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PasswordUpdate from '../components/PasswordUpdate'
import Select from 'react-select'
import { useGetCountries } from '../hooks/useCountries'
import authStore from '../store/authStore'
import { useUpdateProfile } from '../hooks/useUsers'
import { Modal } from '@/components/Modal'

const Profile = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const { data } = useGetCountries()
  const [countriesName, setCountriesName] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const { user, updateUser } = authStore()
  const [form, setForm] = useState({
    id: user.id,
    email: user.email,
    nacimiento: user.nacimiento ? new Date(user.nacimiento) : null,
    nombre: user.nombre,
    apellidos: user.apellidos,
    perfil: user.perfil,
    username: user.username,
    pais: user.pais,
    telefono: user.telefono,
    genero: user.genero,
    se_unio: new Date(user.se_unio)
  })
  const [viewConditions, setViewConditions] = useState(false)
  const openModal = () => setViewConditions(true)
  const closeModal = () => setViewConditions(false)
  const { mutate: updateProfile, error, isPending, isSuccess } = useUpdateProfile()
  const [errors, setErrors] = useState({})
  const [errorState, setErrorState] = useState({})



  useEffect(() => {
    if (data) {
      setCountriesName((prevCountries) => [
        ...prevCountries,
        ...data.map((data) => data.translations.spa.common)
      ])
    }
  }, [data])

  useEffect(() => {
    if (isSuccess) updateUser(form)
  }, [isSuccess])

  useEffect(() => {
    setErrorState(error ? error : {})
  }, [error])



  const sendData = () => {
    if (!errors.name && !errors.lastname && !errors.email && !errors.userName) {
      const actualEmail = user.email
      const { email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero } = form
      updateProfile({ actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero })
    }
  }

  const handleDateChange = (date) => {
    setForm((prevForm) => ({
      ...prevForm,
      ['nacimiento']: date,
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrorState({})

    if (name === 'nombre' || name === 'apellidos') {
      const nameRegex = /^[a-zA-Z\s]+$/
      setErrors({
        ...errors,
        [name]: nameRegex.test(value) ? '' : 'Solo se permiten letras y espacios',
      })
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const allowedDomains = ['hotmail.com', 'gmail.com', 'yahoo.com', 'outlook.com'];
      const domain = value.split('@')[1];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const showUrl = URL.createObjectURL(file)
      setImageUrl(showUrl)
    }
  }

  const style = {
    control: (provided) => ({
      ...provided,
      borderColor: '#3E5C76',
      color: '#cbd5e1',
      borderWidth: '2px',
      borderRadius: '0.2rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3E5C76',
        cursor: 'text',
      },
      '&:focus': {
        outline: 'none',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d9e2ec' : 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#9ca3af',
      },
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    })
  }

  const inputStyles = {
    border: '2px solid #3e5c76',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#f9f9f9',
    width: '255px',
    outline: 'none',
  }


  const genderOptions = [
    { value: "Hombre", label: "Hombre" },
    { value: "Mujer", label: "Mujer" },
  ]

  return (
    <div className="container mx-auto px-4">
      <section className="py-4">
        <h2 className="text-2xl font-bold">Mi Perfil</h2>
      </section>
      <p className="text-lg mb-6">
        ¡Gracias por ser parte de la comunidad de lectores y oyentes de Healthtone! <br />
        ¡Apreciamos que seas un miembro de nuestra comunidad!
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-6">
          <div className="md:text-left w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-htc-blue">
            <img
              src={imageUrl ? imageUrl : '/src/assets/med.jpg'}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-semibold text-gray-800">{user.username}</h3>
            <p className="text-gray-600">Se unio el: {`${form.se_unio.getFullYear()}/${form.se_unio.getMonth() + 1}/${form.se_unio.getDate()}`}</p>
          </div>
        </div>

        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-gray-300 hover:bg-htc-lightblue font-bold py-2 text-center w-[200px] rounded-md transition duration-300"
        >
          Cambiar foto de Perfil
        </label>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Correo Electronico:</span>
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="No especificado"
              onChange={handleChange}
              className='text-gray-800 w-64 border-htc-blue border-2 rounded-sm h-8 px-2 focus:outline-none py-4'
            />
          </div>
            {errors.email && <small className='text-red-600'>{errors.email}</small>}
            {errorState && errorState.status === 409 && (
              <small className='text-red-600'>{errorState.response.data.message}</small>
            )}

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Nombre(s):</span>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              placeholder="No especificado"
              onChange={handleChange}
              className='text-gray-800 w-64 border-htc-blue border-2 rounded-sm h-8 px-2 focus:outline-none py-4'
            />
          </div>
            {errors.nombre && <small className='text-red-600'>{errors.nombre}</small>}

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Apellido(s):</span>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              placeholder="No especificado"
              onChange={handleChange}
              className='text-gray-800 w-64 border-htc-blue border-2 rounded-sm h-8 px-2 focus:outline-none py-4'
            />
          </div>
            {errors.apellidos && <small className='text-red-600'>{errors.apellidos}</small>}

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Fecha de Nacimiento:</span>
            <div className="contenedor w-64">
              <DatePicker
                name='nacimiento'
                {...(form.nacimiento ? { selected: form.nacimiento } : {})}
                onChange={handleDateChange}
                placeholderText="Escriba su fecha de nacimiento"
                customInput={<input style={inputStyles} />}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">País:</span>
            {countriesName &&
              <Select
                name="pais"
                value={countriesName.find(country => country === form.pais) ? { value: form.pais, label: form.pais } : null}
                onChange={(selectedOption) => setForm({ ...form, pais: selectedOption.value })}
                options={countriesName.map((country) => ({ value: country, label: country }))}
                className="w-64"
                placeholder="No especificado"
                styles={style}
              />
            }
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Número de teléfono:</span>
            <input
              type="text"
              name="telefono"
              value={form.telefono || ''}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d*$/.test(value) && value.length <= 8) {
                  handleChange(e)
                }
              }}
              placeholder="No especificado"
              className='w-64 border-htc-blue border-2 rounded-sm px-2 h-8 focus:outline-none focus:none py-4'
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Género:</span>
            <Select
              name="genero"
              value={genderOptions.find(option => option.value === form.genero) || null}
              onChange={(selectedOption) => setForm({ ...form, genero: selectedOption.value })}
              options={genderOptions}
              className='w-64'
              placeholder="No especificado"
              styles={style}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
          <button
            className="text-left my-auto font-medium text-htc-lightblue hover:text-htc-blue"
            onClick={openModal}>
            <span className="border-b border-htc-blue hover:border-htc-blue">
              Nuestros términos y condiciones
            </span>
          </button>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white transition duration-300"
              onClick={sendData} >
              Editar Perfil
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white transition duration-300"
              onClick={() => { setIsPasswordOpen(true) }} >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {isPasswordOpen && (
        <PasswordUpdate setOpen={setIsPasswordOpen} />
      )}


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

export default Profile
