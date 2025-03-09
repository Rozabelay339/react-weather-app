

const getWeatherBycity = async(city) => {

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data)

  } catch (error) {
    
  }

  return (
    <div>Service</div>
  )
};

export default getWeatherBycity;