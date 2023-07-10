// Fetch weather data from the API and update the HTML elements
function fetchWeatherData(city, units) {
    const apiKey = "461a196c481b4ef12eb9ca6c719d0ef2";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid city name");
            }
            return response.json();
        })
        .then(data => {
            // Update weather information
            const weatherIcon = document.getElementById("weatherIcon");
            const tempElement = document.getElementById("temp");
            const cityNameElement = document.getElementById("cityName");
            const humidityElement = document.getElementById("humidity");
            const windSpeedElement = document.getElementById("windSpeed");

            weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            tempElement.textContent = `${data.main.temp} °${units === 'imperial' ? 'F' : 'C'}`;
            cityNameElement.textContent = data.name;
            humidityElement.textContent = `${data.main.humidity}%`;
            windSpeedElement.textContent = `${data.wind.speed} km/h`;

            // Add event listener to the temperature display for unit toggle
            tempElement.addEventListener("click", () => {
                units = units === 'imperial' ? 'metric' : 'imperial';
                fetchWeatherData(city, units);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to handle unit toggle
function handleUnitToggle(city) {
    const unitToggle = document.getElementById("unitToggle");
    const units = unitToggle.value;
    fetchWeatherData(city, units);
}

// Add event listener to the search button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    handleUnitToggle(city);
});

// Add event listener to the unit toggle dropdown
const unitToggle = document.getElementById("unitToggle");
unitToggle.addEventListener("change", () => {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    handleUnitToggle(city);
});
