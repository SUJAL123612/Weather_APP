const API_KEY = "05ff1f905866c4d9f4a4ecda6e19c8cf";

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp;
      const condition = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const iconCode = data.weather[0].icon;

      document.getElementById("temperature").innerText = `${temperature}°C`;
      document.getElementById("condition").innerText = capitalize(condition);
      document.getElementById("humidity").innerText = `${humidity}%`;
      document.getElementById("wind").innerText = `${windSpeed} Km/H`;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById("weatherData").style.display = "block";
    })
    .catch((error) => {
      alert("Error: " + error.message);
      document.getElementById("weatherData").style.display = "none";
    });
}

function capitalize(text) {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

document.getElementById("goToSecondPage").addEventListener("click", function () {
  const city = document.getElementById("cityNameInput").value.trim();
  if (city) {
    document.getElementById("first_page").style.display = "none";
    document.getElementById("second_page").style.display = "block";
    document.getElementById("cityInput").value = city;
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
