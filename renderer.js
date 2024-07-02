const btnSearch = document.getElementById("btnSearch");
document.getElementById('city').focus();

btnSearch.addEventListener("click", async function (e) {
    e.preventDefault();
    const city = document.getElementById("city").value;
    try {
        const weather = await window.electron.getWeather(city);
        displayWeather(city, weather);
    } catch (error) {
        console.error('Error getting weather data:', error);
    }
});

function displayWeather(city, weather) {
    document.getElementById("cityName").textContent = city;
    document.getElementById("temperature").textContent = `Température: ${weather.temperature.toFixed(1)}°C`;
    document.getElementById("humidity").textContent = `Humidité: ${weather.humidity}%`;
    document.getElementById("windSpeed").textContent = `Vitesse du vent: ${weather.windSpeed} m/s`;
}
