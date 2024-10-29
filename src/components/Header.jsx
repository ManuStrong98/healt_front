import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Header = ({ toggleSidebar }) => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(!!inputValue.trim() && `/?search=${inputValue.trim()}`)
  }

  return (
    <div className='h-20 bg-white border-b border-gray-200 flex items-center justify-between px-3 lg:justify-end lg:pl-0 lg:pr-20 gap-2'>
      <Link to='/' className='lg:hidden'>
        <img src='/healthtone_black.svg'
          className='w-16'
          alt='logo-healthtone'
        />
      </Link>

      <form onSubmit={handleSubmit}
        className='flex items-center gap-2 border border-htc-black rounded-lg px-3'
      >
        <input
          type='text'
          placeholder='Buscar Audiolibro'
          className='focus:outline-none min-w-20 max-w-28 sm:max-w-48 lg:w-96'
          maxLength={100}
          value={inputValue}
          onChange={({ target: { value } }) => { setInputValue(value) }}
        />

        <div className='h-10 w-px bg-gray-300' />

        <button type='submit'>
          <i className='bi bi-search'></i>
        </button>
      </form>

      <button className='lg:hidden' onClick={() => { toggleSidebar(false) }}>
        <i className='bi bi-list text-4xl'></i>
      </button>
    </div>
  )
}
