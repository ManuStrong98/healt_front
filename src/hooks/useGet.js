import { useState, useEffect } from 'react'


export const useGet = (url) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('El fetch get no salio como se esperaba')
        }

        const data = await response.json()
        setResult(data)
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
