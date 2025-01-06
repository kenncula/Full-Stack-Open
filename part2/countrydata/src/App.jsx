import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/Countries'

const App = ({ }) => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')


  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        setFilteredCountries(initialCountries)
      })
  }, [])


  const handleNewCountrySearch = (event) => {
    setCountrySearch(event.target.value)
    const searchValue = event.target.value.toLowerCase();
    setFilteredCountries(countries.filter(country => 
      country.name.common.toLowerCase().includes(searchValue)
    || country.name.official.toLowerCase().includes(searchValue)
  ))
}

  return (
    <div>
      <h1>Country Data</h1>
      <Filter filter={countrySearch} filterChange={handleNewCountrySearch}/>
      <Countries countries={filteredCountries}/>
    </div>

  )
}

export default App