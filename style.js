// Update function here
let apiKey = "a3a52cc6f810ba9bb9deaaefe37a7628";

// DOM Elements
let temperatureElement = document.querySelector("#temp");
let celsius = document.querySelector("#celsius-link");
let form = document.querySelector("#search-form");
let fahrenheit = document.querySelector("#fahrenheit-link");

// Event Listeners
form.addEventListener("submit", search);
celsius.addEventListener("click", calculateCelsius);
// fahrenheit.addEventListener("click", calculateFahrenheit);

// Methods

function getForecast(coordinates) {
  // console.log(coordinates);

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function update(response) {
  let { data } = response;
  // console.log(
  //   data.name,
  //   //   data.main.temp,
  //   //   data.weather[0].description,
  //   //   data.sys.country,
  //   //   data.main.humidity,
  //   //   data.wind.speed,
  //   data
  // );

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${data.name}`;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${data.weather[0].description}`;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${data.sys.country}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(`${response.data.wind.speed}`);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${data.weather[0].description}`);

  getForecast(data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(update);
}

// Celsius Calculation:
function calculateCelsius(event) {
  event.preventDefault();

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  // let temperature = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// function calculateFahrenheit(event) {
//   event.preventDefault();

//   // let temperature = document.querySelector("#temperature-value");

//   celsius.classList.remove("active");
//   fahrenheit.classList.add("active");

//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// weather forecast function start here
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  // console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
        
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42"/>
        <br />

        <span class="weather-forecast-temperatures-max">${Math.round(
          forecastDay.temp.max
        )} &deg;<span style="font-size:12px"></span></span>
        <span class="weather-forecast-temperatures-min">${Math.round(
          forecastDay.temp.min
        )} &deg;<span style="font-size:12px"></span></span>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
