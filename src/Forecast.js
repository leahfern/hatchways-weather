import React, { useEffect, useState, useCallback } from 'react'
import WeatherTiles from './WeatherTiles'

const cities =
  {
    Redondo: {
      name: 'Redondo Beach, CA',
      lat: '33.86',
      lon: '-118.38'
    }
  }

export default function Forecast() {
  const [city] = useState(cities.Redondo)
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)

  const trimData = ( useCallback(
    (apiResponse) => {
      const formatted = []
  
      for (let i = 0; i < 5; i++) {
        formatted.push({
          min: Math.round(apiResponse.daily[i].temp.min).toString() + '\u00B0',
          max: Math.round(apiResponse.daily[i].temp.max).toString() + '\u00B0',
          iconURL: `http://openweathermap.org/img/wn/${apiResponse.daily[i].weather[0].icon}@2x.png`,
          weekday: findDayOfWeek(i)
        })
      }
      return(formatted)
    },
    [],
  ))

  const findDayOfWeek = (addedDays) => {
    const today = new Date()
    const thisDate =  new Date()
    thisDate.setDate(today.getDate() + addedDays)
    return thisDate.toLocaleString("default", { weekday: "short" })
  }

  useEffect(() => {
    async function fetchWeather() {
      const url = `/.netlify/functions/weather?lat=${city.lat}&lon=${city.lon}`;
      try {
        setLoading(true)
        const weather = await fetch(url).then((res) => res.json());
        console.log(weather)
        setWeatherData(trimData(weather.data))
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather();
  }, [city, trimData])

  return (
    <div>
      <WeatherTiles weatherData={weatherData} loading={loading}/>
    </div>
  )
}
