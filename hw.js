const apiKey = "d391cb4db9bcad8dcecf707320d86843";

console.log('Enter a city!!');

const getWeatherInfo = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${cityName}`;
  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    throw error;
  }
};

const displayWeatherInfo = (cityName, temperature, humidity, windSpeed) => {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <p>Temperature: ${temperature}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} mph</p>
  `;
};

const getPokemon = async (e) => {
  e.preventDefault();
  console.log('Form submitted!');
  let cityName = e.target.city.value;
  console.log(cityName);
  if (cityName === '') {
    cityName = 'Arlington';
  }

  try {
    const data = await getWeatherInfo(cityName);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    displayWeatherInfo(cityName, temperature, humidity, windSpeed);
  } catch (error) {
    console.error('Error:', error.message);
    const container = document.getElementById('container');
    container.innerHTML = `<p>Error: ${error.message}</p>`;
  }
};

const form = document.querySelector('form');
form.addEventListener('submit', getPokemon);