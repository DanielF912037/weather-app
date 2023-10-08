// Define the API key and the base URL for the OpenWeatherMap API
const apiKey = "ccbb7716278198ff4e07bd639211f1f3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get references to HTML elements using their CSS classes
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Define an asynchronous function to fetch and display weather data
async function checkWeather(city) {

    // Check if the city input is empty or contains only spaces
    if (!city.trim()) {
        alert("Please enter a valid city name.");
        return;
    }

    // Fetch weather data from the OpenWeatherMap API
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);

    // Check if the API returned a 404 status code (city not found)
    if (response.status === 404) {
        alert("City not found. Please enter a valid city name.");
        return;
    }

    // Parse the JSON data from the API response
    const data = await response.json();

    // Log the weather data to the console
    console.log(data);

    // Update the HTML elements with weather information
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set the weather icon based on the weather condition
    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = "images/unknown.png";
    }

    // Display the weather section
    document.querySelector(".weather").style.display = "block";
}

// Add a click event listener to the search button
searchBtn.addEventListener("click", () => {

    // Call the checkWeather function with the user-entered city
    checkWeather(searchBox.value);
})