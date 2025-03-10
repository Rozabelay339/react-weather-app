const getWeatherByCity = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Current Weather:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

const getWeatherForecast = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Weather Forecast:", data);
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
};

const getWeatherByLocation = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Current Weather by Location:", data);
    return data;
  } catch (error) {
    console.error("Geolocation error:", error);
  }
};


const fetchGeolocation = async () => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    return await getWeatherByLocation(latitude, longitude);
  } catch (error) {
    console.error("Geolocation error:", error);
  }
};

export { getWeatherByCity, getWeatherForecast, getWeatherByLocation, fetchGeolocation };
