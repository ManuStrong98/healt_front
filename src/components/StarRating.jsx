export const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<i key={i} className='bi bi-star-fill'></i>)
      } else if (i - 1 < rating && rating < i) {
        stars.push(<i key={i} className='bi bi-star-half'></i>)
      } else {
        stars.push(<i key={i} className='bi bi-star'></i>)
      }
    }
    return stars
  }

  return (
    <div className='flex justify-evenly text-yellow-500'>{ renderStars() }</div>
  )
}
