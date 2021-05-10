// Update function here
let apiKey = "a3a52cc6f810ba9bb9deaaefe37a7628";

function update(response) {
  let { data } = response;
  console.log(
    data.name,
    //   data.main.temp,
    //   data.weather[0].description,
    //   data.sys.country,
    //   data.main.humidity,
    //   data.wind.speed,
    data
  );

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${data.name}`;

  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = Math.round(response.data.main.temp);

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

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Celsius and Fahrenheit Calculate
function calculateCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = globalTemperature;
}

function calculateFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-value");
  let fahrenheit = Math.round((+temperature.innerText * 9) / 5 + 32);
  temperature.innerHTML = fahrenheit;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", calculateCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", calculateFahrenheit);

// weather forecast function start here
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class ="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${day}
        </div>
        <i class="bi bi-cloud"></i><br />
        <span class="weather-forecast-temperatures-max">18℃</span>
        <span class="weather-forecast-temperatures-min">12℃</span>
      </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
