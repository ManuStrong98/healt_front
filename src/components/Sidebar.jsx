import { useStore } from '@/hooks/useStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = ({ toggleSidebar }) => {
    const { pathname, search } = useLocation()
    const { logout } = useAuthStore()
    const { howl } = useStore()
    const options = [
        { label: 'Inicio', icon: 'house', to: '/' },
        { label: 'Explorar', icon: 'search', to: '/explore' },
        { label: 'Favoritos', icon: 'heart', to: '/favorites' }, // Nueva opción para Favoritos
    ]

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        howl.unload()
        logout()
    }

    return (
        <aside className='bg-htc-white h-screen w-full lg:w-52'>
            <div className='h-20 flex justify-between items-center px-3 lg:justify-center'>
                <Link to='/'>
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
                        onClick={() => { toggleSidebar() }}
                    >
                        <i className={`bi bi-${icon} text-lg`}></i>
                        <small className='text-lg'>{label}</small>
                    </Link>
                ))}
            </div>

            <Link
                to='/login'
                onClick={handleLogout}
                className='flex gap-5 py-3 w-full items-center justify-center fixed bottom-0 mb-10 lg:w-52'
            >
                <i className='bi bi-box-arrow-left text-lg'></i>
                <span className='text-lg'>Cerrar Sesión</span>
            </Link>
        </aside>
    )
}
