const getWeatherByCity = async (city) => {
  try {
    console.log("API Key:", import.meta.env.VITE_API_ID);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(`API Error: ${data.message}`);
    }

    console.log("Current Weather:", data);
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      city: data.name,
      country: data.sys.country,
      weatherDescription: data.weather[0].description,
      icon: data.weather[0].icon,
      wind: {
        speed: data.wind?.speed ?? 0, 
        deg: data.wind?.deg ?? 0       
      }
    };
    
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
};

const getWeatherForecast = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== '200') {
      throw new Error(`API Error: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
};


const getWeatherByLocation = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_ID}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(`API Error: ${data.message}`);
    }

    console.log("Current Weather by Location:", data);
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      pressure: data.main.pressure,
      city: data.name,
      country: data.sys.country,
      weatherDescription: data.weather[0].description,
      icon: data.weather[0].icon, 
    };
  } catch (error) {
    console.error("Geolocation error:", error);
    return null;
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
