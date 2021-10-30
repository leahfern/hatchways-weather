import React, { useState, useEffect } from 'react'

export default function Title(props) {
  const cities = props.cities
  const setCity = props.setCity
  const city = props.city

  const [cityNames] = useState([])
  const [cityValues] = useState([])

  useEffect(() => {
      for (const place in cities) {
        cityNames.push(cities[place].name)
        cityValues.push(place)
      }
  }, [cities, cityNames, cityValues])

  const handleSelect = (event) => {
    setCity(cities[event.target.value])
  }

  return (
    <div className={`title background${cityValues[cityNames.indexOf(city.name)]}`}>
      <h1>Weather forecast for 
        <select onChange={handleSelect}>
        <option key="Redondo" value="Redondo">Redondo Beach, CA</option>
        <option key="Pittsburgh" value="Pittsburgh">Pittsburgh, PA</option>
        <option key="Morgantown" value="Morgantown">Morgantown, WV</option>
        <option key="Valparaiso" value="Valparaiso">Valparaiso, Chile</option>

        </select>
      </h1>
    </div>
  )
}
