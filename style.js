let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// Searching function here
let apiKey = "a3a52cc6f810ba9bb9deaaefe37a7628";

function update(response) {
  let { data } = response;
  //console.log(data.name, data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${data.name}`;
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = Math.round(data.main.temp);
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
let h6 = document.querySelector("h6");
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

h6.innerHTML = `${day} ${hours}:${minutes}<br>Partly Cloudy</br>`;
console.log(hours);

// Celsius and Fahrenheit Calculate
function calculateCelsius(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = weather[searchInput.value.toLowerCase()].temp;
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

  let days = ["sun", "mon", "tue", "wed", "thu"];

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
