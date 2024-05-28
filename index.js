const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');

searchbox.addEventListener('keypress', function(evt) {
  if (evt.key === 'Enter') {
    getResults(searchbox.value);
  }
});

searchButton.addEventListener('click', function() {
  getResults(searchbox.value);
});

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      alert(error.message);
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city .city_name');
  city.innerText = weather.name;

  let country = document.querySelector('.location .city .country_name');
  country.innerText = weather.sys.country;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  // Adjusting the background color dynamically
  let container = document.querySelector('.container');
  if (weather.weather[0].main.includes('Sunny')) 
    {
    container.style.background = 'url(sunny.jpg)';
    container.style.backgroundSize = 'cover';
  } 
  else if (weather.weather[0].main.includes('Rain')) 
    {
    container.style.background = 'url(rain.jpg)';
    container.style.backgroundSize = 'cover';
  } 
  else if (weather.weather[0].main.includes('Cloud')) 
    {
    container.style.background = 'url(cloud.jpg)';
    container.style.backgroundSize = 'cover';
  } 
  else
   {
    container.style.background = 'url(sunny.jpg)';
    container.style.backgroundSize = 'cover';
    }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
