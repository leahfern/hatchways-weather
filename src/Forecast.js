import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import WeatherTiles from './WeatherTiles'
import Title from './Title'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const cities =
  {
    Redondo: {
      name: 'Redondo Beach, CA',
      lat: '33.86',
      lon: '-118.38'
    },
    Pittsburgh: {
      name: 'Pittsburgh, PA',
      lat: '40.58',
      lon: '-79.89'
    },
    Morgantown: {
      name: 'Morgantown, WV',
      lat: '39.67',
      lon: '-79.96'
    },
    Valparaiso: {
      name: 'Valparaiso, Chile',
      lat: '-33.04',
      lon: '-71.63'
    }
  }

export default function Forecast() {
  const [city, setCity] = useState(cities.Redondo)
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
    setLoading(true)
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`)
      .then((res) => {
        setWeatherData(trimData(res.data))
        // setTimeout(() => {
          setLoading(false)
        // }, 300)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }, [city, trimData])

  return (
    <div>
      <Title city={city} setCity={setCity} cities={cities}/>
      <WeatherTiles weatherData={weatherData} loading={loading}/>
    </div>
  )
}
