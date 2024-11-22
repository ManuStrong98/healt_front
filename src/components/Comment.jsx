export const Comment = ({ id, author, message, date }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleString('es-ES', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })

  return (
    <div className='flex flex-col w-full py-4 border-b border-gray-300'>
      <div className='flex items-center'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'></div>

        <div className='ml-4 flex-1'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-sm'>{author.username}</span>
            <span className='text-xs text-gray-500'>{formatDate(date)}</span>
          </div>

          <p className='text-sm text-gray-700 mt-1'>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
