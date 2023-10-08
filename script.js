const apiKey = "ccbb7716278198ff4e07bd639211f1f3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
        
async function checkWeather(city) {

    if (!city.trim()) {
        alert("Please enter a valid city name.");
        return;
    }
    
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);
    
    if (response.status === 404) {
        alert("City not found. Please enter a valid city name.");
        return;
    }
            
    const data = await response.json();
            
            
    console.log(data);
            
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            
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
                
    document.querySelector(".weather").style.display = "block";
        
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})