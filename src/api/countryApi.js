import axios from 'axios'

const urlCountries = 'https://restcountries.com/v3.1/all'

export const getCountries = async () => {
  try {
    const response = await axios.get(urlCountries)
    return response.data
  } catch (error) {
    throw new Error('No se pudo obtener los países')
  }
}