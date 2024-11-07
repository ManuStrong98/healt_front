export const Error = ({ children }) => {
  return (
    <div className='text-center py-10'>
      <p className='font-semibold text-lg text-red-600'>{children}</p>
    </div>
  )
}
