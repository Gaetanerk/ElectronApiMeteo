const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getWeather: async (city) => {
    try {
      const apiKey = await ipcRenderer.invoke('getApiKey');
      const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey);
      if (!weatherResponse.ok) {
        throw new Error(`Weather response status: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();
      return {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
});
