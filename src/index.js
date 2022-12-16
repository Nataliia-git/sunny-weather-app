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

function manageSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

function showTemperature(response) {
  let currentCity = response.data.city;
  let currentCityValue = document.querySelector("#city");
  currentCityValue.innerHTML = currentCity;
  celsiusTemperature = response.data.temperature.current;
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = Math.round(celsiusTemperature);
  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let conditionDescription = response.data.condition.description;
  let conditionDescriptionValue = document.querySelector("#conditions");
  conditionDescriptionValue.innerHTML = `${conditionDescription}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
}

let currentDate = document.querySelector("#date");
let currentTime = new Date();
currentDate.innerHTML = renderDate(currentTime);

function retrievePosition(position) {
  let apiKey = "4a0a9aa45ad0959e9357bf0of17t2779";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  https: axios.get(url).then(showWeather);
}

function showWeather(response) {
  let currentCity = response.data.city;
  let currentCityValue = document.querySelector("#city");
  currentCityValue.innerHTML = currentCity;
  let temperature = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = temperature;
  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let conditionDescription = response.data.condition.description;
  let conditionDescriptionValue = document.querySelector("#conditions");
  conditionDescriptionValue.innerHTML = `${conditionDescription}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationValue = document.querySelector("#location");
locationValue.addEventListener("click", getPosition);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheihtLink.classList.add("active");
  let temperatureValue = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureValue.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheihtLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheihtLink = document.querySelector("#fahreinheit-link");
fahrenheihtLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", manageSearch);

function search(city) {
  let apiKey = "4a0a9aa45ad0959e9357bf0of17t2779";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

search("Male");
