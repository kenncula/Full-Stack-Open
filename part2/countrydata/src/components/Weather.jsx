const Weather = ({ weather }) => {
    return (
        <div> 
            <h2>Weather in {weather.location.name}</h2>
            <p>temperature is {weather.current.temp_f} F</p>
            {/* <img src={} alt={`Weather in ${weather.location.name}`}/>  */}
            <p>wind {weather.current.wind_mph} mph</p>
        </div>
    )
}
export default Weather