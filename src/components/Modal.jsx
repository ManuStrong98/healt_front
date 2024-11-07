export const Modal = ({ children, title, onClose, isStatic }) => (
  <div
    className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
    onClick={(e) => { if (e.target === e.currentTarget && !isStatic) onClose() }}
  >
    <div className='bg-white py-8 rounded-lg shadow-lg w-11/12 max-w-lg relative'>
      <button
        onClick={onClose}
        className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl'
        aria-label='Cerrar modal'
      >
        <i className='bi bi-x-lg'></i>
      </button>

      {title && (
        <h2 className='text-xl font-bold mb-6 text-center'>
          {title}
        </h2>
      )}

      <div className='max-h-[70vh] overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-gray-500 lg:px-10'>
        {children}
      </div>
    </div>
  </div>
)
