const apiKey = "aad36276d05508f70f65cf1d17834624";

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    showError("Please enter a city ❗");
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(city)) {
    showError("Only valid city names allowed ❌");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  document.getElementById("weather-result").innerHTML = "Loading...";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      showError("City not found ❌");
      return;
    }

    const icon = data.weather[0].icon;

    document.getElementById("weather-result").innerHTML = `
      <div class="main-weather">

        <h2>${data.name}</h2>
        <p>📅 ${new Date().toLocaleString()}</p>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />

        <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
        <p>${data.weather[0].main}</p>

        <!-- UX Hint -->
        <p class="info-tip">💡 Click on cards to understand weather metrics</p>

        <div class="extra-info">

          <div class="info-box" onclick="showPopup('Feels Like', 'How hot it actually feels based on humidity and wind.')">
            🔥 Feels Like<br>${Math.round(data.main.feels_like)}°C
          </div>

          <div class="info-box" onclick="showPopup('Humidity', 'Amount of moisture in the air.')">
            💧 Humidity<br>${data.main.humidity}%
          </div>

          <div class="info-box" onclick="showPopup('Wind Speed', 'Speed of air movement around you.')">
            🌬 Wind<br>${data.wind.speed} m/s
          </div>

        </div>

      </div>
    `;

  } catch {
    showError("Something went wrong ⚠️");
  }
}

function showError(msg) {
  document.getElementById("weather-result").innerHTML =
    `<p style="color:#ff4d4d;">${msg}</p>`;
}

function showPopup(title, text) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-text").innerText = text;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.getElementById("city").addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});