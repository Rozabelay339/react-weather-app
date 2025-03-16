import { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherForecast, fetchGeolocation } from '../service/Service';
import Search from '../components/Search/Search';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import FavoritePlaces from '../components/FavoritePlace/FavoritePlaces';
import Forecast from '../components/Forecast/Forecast';

const DataContainer = () => {
  const [currentCity, setCurrentCity] = useState('Stockholm');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

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

  // Function to save a city as a favorite
  const addFavorite = () => {
    if (!favorites.includes(currentCity)) {
      const updatedFavorites = [...favorites, currentCity];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Function to remove a favorite city
  const removeFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter((city) => city !== cityToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
      <button onClick={addFavorite}>Save as Favorite</button>
      <FavoritePlaces setCity={setCurrentCity} favorites={favorites} removeFavorite={removeFavorite} />
    </>
  );
};

export default DataContainer;
