export const ProgressBar = ({ now, min = 0, max, onClick }) => {
  const progress = (now / max) * 100

  return (
    <div
      className='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden hover:cursor-pointer'
      role='progressbar'
      aria-valuenow={now}
      aria-valuemin={min}
      aria-valuemax={max}
      onClick={onClick}
    >
      <div
        className='flex flex-col justify-center rounded-full overflow-hidden bg-htc-blue text-xs text-white text-center whitespace-nowrap transition duration-100'
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  )
}
