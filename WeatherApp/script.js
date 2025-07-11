document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

        const API_KEY = "8e6c52ec93e62a8b031d32dfcc0cadec";

        getWeatherBtn.addEventListener("click", async() => {
            const city = cityInput.value.trim()
            if(!city) return

            //It may through an error
            //server/database is always in another continent

            try {
                const weatherData = await fetchWeatherData(city);
                displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }
        })


        async function fetchWeatherData(city){
            //gets the data

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            

            const responce =await fetch(url);
            console.log(typeof responce);
            console.log("RESPONCE",responce);

            if(!responce.ok) {
                throw new Error("City not found");
            }

            const data = await responce.json();
            return data;
        }

        function displayWeatherData(data){
            //display
            console.log(data);
            const {name,main,weather} = data
            cityNameDisplay.textContent = name
            temperatureDisplay.textContent = `Temprature : ${main.temp}`;
            descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

            // unlock the display
            weatherInfo.classList.remove("hidden");
            errorMessage.classList.add("hidden");
            
        }

        function showError(){
            weatherInfo.classList.add("hidden");
            errorMessage.classList.remove("hidden");
        }
})