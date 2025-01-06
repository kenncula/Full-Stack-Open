import { useState, useEffect } from 'react'
import weatherService from './services/Weather.js'
import Weather from './Weather'

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        weatherService
          .getWeather(country.capital)
          .then(initialWeather => {
            setWeather(initialWeather)
            // console.log(initialWeather)
          })
      }, [])
      
    if (weather.length === 0){
        return (
            <div>
            <h2>{country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.official}`}/>
        </div>
        )
    }
    else{
        return (
        <div>
            <h2>{country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.official}`}/>
            <Weather weather={weather}/>
        </div>
        )
    }
}

export default Country