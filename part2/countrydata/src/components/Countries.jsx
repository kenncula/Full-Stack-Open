import { useState } from 'react'
import Country from './Country' 

const Countries = ({ countries }) => {
    const [showCountry, setShowCountry] = useState(new Array(countries.length).fill(false))
    
    
    const handleShowCountry = (index) => {
        const newShowCountry = [...showCountry]
        newShowCountry[index] = !newShowCountry[index]
        setShowCountry(newShowCountry)
    }    
    return (
        countries.length === 1
        ? <Country country={countries[0]}/>
        : countries.length > 10
            ? <p>Too many matches, specify another filter</p> 
            : countries.map(country => (
                <div key={country.name.common}>
                    <strong>{country.name.common} </strong>
                    <button onClick={() => handleShowCountry(countries.indexOf(country))}>
                        {!showCountry[countries.indexOf(country)] ? 'show':'hide'}
                    </button>
                    {showCountry[countries.indexOf(country)] && <Country country={country}/>}
                </div>
            ))
    )
}

export default Countries