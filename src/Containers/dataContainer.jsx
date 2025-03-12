import { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherForecast, fetchGeolocation } from '../service/Service';
import Search from '../components/Search/Search';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import FavoritePlace from '../components/FavoritePlace/FavoritePlace';
import Forecast from '../components/Forecast/Forecast';


const DataContainer = () => {
  const [currentCity, setCurrentCity] = useState('Stockholm');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // Fetch weather by city
  useEffect(() => {
    const fetchCityWeather = async () => {
      const weather = await getWeatherByCity(currentCity);
      const forecast = await getWeatherForecast(currentCity);
      if (weather) setWeatherData(weather);
      if (forecast) setForecastData(forecast);
    };

    fetchCityWeather();
  }, [currentCity]);

  // Fetch weather by geolocation on first load
  useEffect(() => {
    const loadGeolocationWeather = async () => {
      const locationWeather = await fetchGeolocation();
      if (locationWeather) setWeatherData(locationWeather);
    };

    loadGeolocationWeather();
  }, []);

  return (
    <>
      <Search setCurrentCity={setCurrentCity} />
      <CurrentWeather data={weatherData} />
      <Forecast data={forecastData} />
      <FavoritePlace favoriteCities={['Stockholm', 'Oslo', 'Copenhagen']} setCurrentCity={setCurrentCity} />
    </>
  );
};

export default DataContainer;
