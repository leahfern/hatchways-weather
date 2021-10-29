import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import WeatherTiles from './WeatherTiles'

const apiKey = '034a8a2f3d91707908cb225f36b2cd3a'

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
    setLoading(true)
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`)
      .then((res) => {
        setWeatherData(trimData(res.data))
        setTimeout(() => {
          setLoading(false)
        }, 300)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }, [city, trimData])

  return (
    <div>
      <WeatherTiles weatherData={weatherData} loading={loading}/>
    </div>
  )
}
