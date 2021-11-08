const axios = require("axios");

exports.handler = async (event) => {
  console.log(event);

  try {
    const { lat, lon } = event.queryStringParameters;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
}

// module.exports = { handler }