import styles from './CurrentWeather.module.css';

const CurrentWeather = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>Loading weather...</p>;
  }

  const iconUrl = data.icon 
    ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
    : '';

  return (
    <div className={styles.container}>
      {iconUrl && (
        <img src={iconUrl} alt={data.weatherDescription} className={styles.weatherIcon} />
      )}
      <h2>{data.city}, {data.country}</h2>
      <h3>Current Weather</h3>
      <div className={styles.tempContainer}>
        <h3 className={styles.temp}>{data.temperature}°C</h3>
        <p className={styles.feels}>Feels Like: {data.feelsLike}°C</p>
      </div>
      <p>Wind: {data.wind.speed} m/s, {data.wind.deg}°</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Pressure: {data.pressure} hPa</p>
      <p>Condition: {data.weatherDescription}</p>
      
    </div>
  );
};

export default CurrentWeather;
