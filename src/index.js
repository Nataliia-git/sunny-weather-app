function renderDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = temperature;
  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `Wind: ${wind} km/h`;
  console.log(response.data);
  let humidity = response.data.main.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let conditions = response.data.clouds.all;
  let conditionsValue = document.querySelector("#conditions");
  if (conditions <= 25) {
    conditionsValue.innerHTML = "Sunny";
  } else {
    conditionsValue.innerHTML = "Overcast";
  }
}

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = renderDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = temperature;
  let cityValue = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = cityValue;
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationValue = document.querySelector("#location");
locationValue.addEventListener("click", getPosition);
