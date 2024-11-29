import { Modal } from '@/components/Modal'
import { usePostQualification } from '@/hooks/useBooks'
import { useState } from 'react'

export const Qualification = ({ id, initValue = 0, setView }) => {
  const [value, setValue] = useState(initValue)
  const [hoverIndex, setHoverIndex] = useState(0)
  const { mutate: post, isPending } = usePostQualification(id)

  const handleCloseCalif = () => {
    setView(false)
  }

  const handleSubmit = async () => {
    try {
      if (value !== 0) {
        await post({
          qualification: value,
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      handleCloseCalif()
    }
  }

  return (
    <Modal title='Califica el contenido' onClose={handleCloseCalif}>
      <div className='flex justify-around text-2xl text-yellow-500'>
        {Array.from({ length: 5 }, (_, index) => {
          const isHovered = hoverIndex > index
          const isSelected = value > index
          return (
            <button
              key={index}
              onClick={() => setValue(index + 1)}
              onMouseEnter={() => setHoverIndex(index + 1)}
              onMouseLeave={() => setHoverIndex(0)}
              className='transition duration-200 cursor-pointer'
            >
              <i
                className={`${
                  isHovered || isSelected ? 'bi bi-star-fill text-yellow-300' : 'bi bi-star'
                }`}
              ></i>
            </button>
          )
        })}
      </div>

      <div className='flex justify-between mt-5 mb-1'>
        <button
          type='button'
          className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          onClick={handleCloseCalif}
        >
          Cancelar
        </button>
        <button
          type='button'
          className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          disabled={isPending}
          onClick={handleSubmit}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  )
}
