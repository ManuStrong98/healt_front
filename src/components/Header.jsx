import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Header = ({ toggleSidebar }) => {
  const [inputValue, setInputValue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedState, setSelectedState] = useState('Todos')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const path = selectedState === 'Favoritos' ? '/favorites' : ''
    navigate(!!inputValue.trim() && `/?search=${inputValue.trim()}`, { state: path })
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleStateChange = (state) => {
    setSelectedState(state)
    setIsDropdownOpen(false)
  }

  return (
    <div className='h-20 bg-white border-b border-gray-200 flex items-center justify-between px-3 lg:justify-end lg:pl-0 lg:pr-20 gap-2 relative'>
      <Link to='/' className='lg:hidden'>
        <img src='/healthtone_black.svg' className='w-16' alt='logo-healthtone' />
      </Link>

      <form onSubmit={handleSubmit} className='flex items-center gap-2 border border-htc-black rounded-lg px-2 relative'>
        <button type='button' onClick={toggleDropdown} className='relative'>
          <i className='bi bi-three-dots-vertical'></i>
        </button>

        <div className='h-10 w-px bg-gray-300' />

        <input
          type='text'
          placeholder='Buscar Audiolibro'
          className='focus:outline-none w-auto max-w-20 sm:max-w-48 lg:w-96'
          maxLength={100}
          value={inputValue}
          onChange={({ target: { value } }) => { setInputValue(value) }}
        />

        <div className='h-10 w-px bg-gray-300' />

        <button type='submit'>
          <i className='bi bi-search'></i>
        </button>

        {isDropdownOpen && (
          <div className='absolute top-12 left-0 lg:left-auto lg:right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-32'>
            <button
              type='button'
              className={`block w-full text-left px-2 py-1 rounded-lg ${selectedState === 'Todos' ? 'bg-htc-lightblue text-white' : 'hover:bg-gray-100'}`}
              onClick={() => handleStateChange('Todos')}
            >
              Todos
            </button>
            <button
              type='button'
              className={`block w-full text-left px-2 py-1 rounded-lg ${selectedState === 'Favoritos' ? 'bg-htc-lightblue text-white' : 'hover:bg-gray-100'}`}
              onClick={() => handleStateChange('Favoritos')}
            >
              Favoritos
            </button>
          </div>
        )}
      </form>

      <button className='lg:hidden' onClick={() => { toggleSidebar(false) }}>
        <i className='bi bi-list text-4xl'></i>
      </button>
    </div>
  )
}
