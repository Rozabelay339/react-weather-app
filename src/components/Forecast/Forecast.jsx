import styles from './Forecast.module.css';

const Forecast = ({ data }) => {
  if (!data || !Array.isArray(data.list) || data.list.length === 0) {
    return <p>No forecast data available.</p>;
  }

  // Group forecasts by date (filtering for one entry per day)
  const dailyForecast = [];
  const seenDates = new Set();

  for (const forecast of data.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecast.push(forecast);
    }

    if (dailyForecast.length === 5) break;
  }
  

  return (
    <div className={styles.container}>
      <h2>5-Day Forecast</h2>
      <div className={styles.forecastGrid}>
        {dailyForecast.map((day, index) => {
          const iconCode = day.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          return (
            <div key={index} className={styles.forecastItem}>
              <p><strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong></p>
              <img src={iconUrl} alt={day.weather[0].description} className={styles.weatherIcon} />
              <p>{day.weather[0].description}</p>
              <p>Min: {day.main.temp_min}°C / Max: {day.main.temp_max}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
