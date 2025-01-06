import axios from 'axios'
const API_KEY = import.meta.env.WEATHER_API_KEY
const baseUrl = 'http://api.weatherapi.com/v1/current.json'

const getWeather = (capital) => {
  console.log(API_KEY)
  const request = axios.get(`${baseUrl}?key=${API_KEY}&q=${capital}`)
  return request.then(response => response.data)
}
export default { getWeather}