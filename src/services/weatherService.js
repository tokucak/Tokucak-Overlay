export async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );

    const data = await response.json();

    return {
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      wind: Math.round(data.current.wind_speed_10m),
      code: data.current.weather_code,
    };
  } catch (error) {
    console.error(error);

    return {
      temperature: "--",
      humidity: "--",
      wind: "--",
      code: 0,
    };
  }
}