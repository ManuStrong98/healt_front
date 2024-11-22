import audioStore from '@/store/audioStore'
import authStore from '@/store/authStore'
import { Link, useLocation } from 'react-router-dom'


export const Sidebar = ({ toggleSidebar }) => {
  const { pathname, search } = useLocation()
  const { logout } = authStore()
  const { logoutAudio, setIsOpenDescription } = audioStore()
  const options = [
    { label: 'Inicio', icon: 'house', to: '/' },
    { label: 'Explorar', icon: 'search-heart', to: '/explore' },
    { label: 'Favoritos', icon: 'heart', to: '/favorites' },
    { label: 'Categorias', icon: 'tags', to: '/categories' },
  ]

  const handleLogout = async () => {
    setIsOpenDescription(false)
    logoutAudio()
    logout()
  }

  return (
    <aside className='bg-htc-white h-screen w-full lg:w-52'>
      <div className='h-20 flex justify-between items-center px-3 lg:justify-center'>
        <Link to='/' onClick={() => setIsOpenDescription(false)}>
          <img src='/healthtone_black.svg' className='w-16' alt='logo-healthtone' />
        </Link>
        <button type='button' onClick={() => { toggleSidebar() }}>
          <i className='bi bi-x text-5xl lg:hidden'></i>
        </button>
      </div>

      <div className='flex flex-col pt-16'>
        {options.map(({ label, icon, to }) => (
          <Link
            to={to}
            key={to}
            className={`flex gap-4 items-center justify-center bg-gradient-to-r ${pathname === to && !search && 'from-htc-lightblue'} to-white-500 py-3`}
            onClick={() => { toggleSidebar(); setIsOpenDescription(false) }}
          >
            <i className={`bi bi-${icon}${pathname === to && !search ? '-fill' : ''} text-lg`}></i>
            <small className='text-lg'>{label}</small>
          </Link>
        ))}
      </div>

      <Link 
        className="flex items-center justify-center gap-4 fixed bottom-20 mb-5 w-full lg:w-52 hover:cursor-pointer"
        to={'/user'}>
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-htc-blue">
          <img
            src="src/assets/med.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg">
            Perfil
          </p>
        </div>
      </Link>


      <button
        onClick={handleLogout}
        className='flex gap-5 py-3 w-full items-center justify-center fixed bottom-0 mb-10 lg:w-52'
      >
        <i className='bi bi-box-arrow-left text-lg'></i>
        <span className='text-lg'>Cerrar Sesión</span>
      </button>
    </aside>
  )
}
