import { Header } from '@/components/Header'
import { Player } from '@/components/Player'
import { Sidebar } from '@/components/Sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex h-screen flex-col lg:flex-row'>
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block z-20`}>
        <Sidebar toggleSidebar={setIsSidebarOpen} />
      </div>

      <div className={`flex-1 flex-col ${isSidebarOpen ? 'hidden' : 'flex'}`}>
        <header className='fixed top-0 left-0 w-full lg:w-auto lg:static z-10'>
          <Header toggleSidebar={toggleSidebar} />
        </header>

        <main className='flex-1 p-3 mb-20 mt-16 lg:mt-0 lg:mb-0 lg:px-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500'>
          <Outlet />
        </main>

        <footer className='fixed h-20 bg-htc-lightblue bottom-0 left-0 w-full lg:w-auto lg:static z-10'>
          <Player />
        </footer>
      </div>
    </div>
  )
}
