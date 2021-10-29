import React from 'react'
import WeatherTile from './WeatherTile'

export default function WeatherTiles(props) {

  return (
    <div className="weatherTiles">
    {
      props.loading
      ? <div>Loading...</div>
      : props.weatherData.map((obj, index) => {
          return (
            <WeatherTile weather={obj} key={index} />
          )
        })
    }
  </div>
  )
}
