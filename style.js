// Update function here
let apiKey = "a3a52cc6f810ba9bb9deaaefe37a7628";

function update(response) {
  let { data } = response;
  console.log(data.name, data.main.temp, data.weather[0].description);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${data.name}`;

  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${data.weather[0].description}`;
}

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(update);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Date update here
let now = new Date();
let currentConditionElement = document.querySelector(".current-condition");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// console.log(days[3]);
let day = days[now.getDay()];

let hours = now.getHours();

let minutes = now.getMinutes();

// currentConditionElement.innerHTML = `<li>${day} ${hours}:${minutes}</li><li>Partly Cloudy</li>`;
//console.log(hours);

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
