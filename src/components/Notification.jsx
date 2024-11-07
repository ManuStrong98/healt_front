export const Notification = ({ message, onConfirm, onCancel, isFav }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='flex flex-col max-w-md gap-2 p-6 rounded-lg shadow-md bg-white dark:bg-gray-50 dark:text-gray-800'>
        <h2 className='flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide'>
          {message}
        </h2>
        <div className='flex flex-col justify-end gap-3 mt-6 sm:flex-row'>
          {isFav && <button
            className='px-6 py-2 rounded-lg bg-htc-lightblue hover:bg-htc-blue text-white'
            onClick={onCancel}
          >
            Cancelar
          </button>}
          <button
            className='px-6 py-2 rounded-lg shadow-sm dark:bg-violet-600 text-white bg-htc-lightblue hover:bg-htc-blue'
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}