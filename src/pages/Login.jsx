import { useState } from 'react'


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDeafault()
    if (!email) {

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <div className="grid gap-2 max-w-2xl w-full mx-auto">
        <div className="flex justify-center">
          <img src="/healthtone_black.svg" className="w-16" alt="logo-healthtone" />
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
            <form
              className="space-y-6"
              onSubmit={handleSubmit}>
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
                {!email && <p className='text-red-600'>El correo electrónico que ingresaste no está conectado a una cuenta.</p>}
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
                {!password && <p className='text-red-600'>La contraseña que ingresaste es incorrecta.</p>}
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-htc-lightblue hover:text-htc-blue">
                  ¿Olvidaste tu contraseña?
                </a>
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
          <a href="#" className="font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue">
            aquí
          </a>
        </div>
      </div>
    </div>
  )
}
