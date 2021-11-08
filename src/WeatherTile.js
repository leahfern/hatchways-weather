import React from "react";

export default function WeatherTile(props) {
  const weather = props.weather;
  return (
    <div className="weatherTile">
      <h4>{weather.weekday}</h4>
      <img src={weather.iconURL} alt="clouds" />
      <div>
        <div>{weather.max}</div>
        <div>{weather.min}</div>
      </div>
    </div>
  );
}
