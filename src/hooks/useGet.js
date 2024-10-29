import axios from 'axios'
import { useEffect, useState } from 'react'


export const useGet = (url) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true)
      const token = localStorage.getItem('access_token')

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setResult(response.data)
      } catch (err) {
        setError('Surgio un problema al hacer fetch de los datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetching()
  }, [url])

  return [result, error, isLoading]
}
