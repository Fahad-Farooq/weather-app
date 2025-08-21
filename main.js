const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "322ecc1feb7c7a2c9b3fa0cd79bcdcc6";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error);
      console.log(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id, icon }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("img");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273).toFixed(1)}°C `; // alt + 0176
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

// function getWeatherEmoji(weatherId) {
//   switch (true) {
//     case weatherId >= 200 && weatherId < 300:
//       return "☁️";
//     case weatherId >= 300 && weatherId < 400:
//       return "☁️";
//     case weatherId >= 500 && weatherId < 600:
//       return "🌫️";
//     case weatherId >= 600 && weatherId < 700:
//       return "❄️";
//     case weatherId >= 700 && weatherId < 800:
//       return "❄️";
//     case weatherId === 800:
//       return "☀️";
//     case weatherId >= 801 && weatherId < 810:
//       return "☁️";
//     default:
//       return "?";
//   }
// }

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
