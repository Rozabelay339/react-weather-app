import styles from './CurrentWeather.module.css';

const CurrentWeather = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>Loading weather...</p>;
  }

  // Build the icon URL using the icon code
  const iconUrl = data.icon 
    ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
    : '';

  return (
    <div className={styles.container}>
      {iconUrl && (
        <img 
          src={iconUrl} 
          alt={data.weatherDescription} 
          className={styles.weatherIcon} 
        />
      )}
      <h2>{data.city}, {data.country}</h2>
      <p>{data.temperature}°C</p>
      <p>Feels Like: {data.feelsLike}°C</p>
      <p>Wind: {data.wind} m/s</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Pressure: {data.pressure} hPa</p>
      <p>Condition: {data.weatherDescription}</p>
      
    </div>
  );
};

export default CurrentWeather;
