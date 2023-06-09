
const zipInput = document.querySelector('#zip');
const button = document.querySelector("#generate")
const feelings = document.querySelector("#feelings")
const journalHistory = document.querySelector("#history")
const weatherBox = document.getElementById("weather")
const date = new Date().toGMTString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
//const BASE_URL = `http://localhost:4000`
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`
const WEATHER_ICONS = `https://openweathermap.org/img/wn/`
//Personal API Key for OpenWeatherMap API
const apiKey = `0e3bae5f3a94ceee3f46ead6d392e58a&units=imperial`

/**
 * Retrieves weather data from OpenWeatherMap API using the provided zip code.
 * @param {string} zip - The zip code to retrieve weather data for.
 * @returns {Promise} - A Promise that resolves to the weather data object or rejects with an error.
 */
const retrieveWeatherData = async (zip) => {
    try {
        const res = await fetch(`${WEATHER_URL}?zip=${zip},us&appid=${apiKey}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}

/**
 * Posts weather data to the server.
 * @param {Object} data - Weather data to post.
 * @param {string} data.date - Date of the weather data.
 * @param {number} data.main.temp - Temperature in Celsius.
 * @param {string} data.name - Location name.
 * @param {string} data.weather[0].description - Weather description.
 * @param {string} data.weather[0].icon - Weather icon.
 * @param {string} feelings - User's feelings about the weather.
 */
const postData = async (data) => {
    try {
        const response = await fetch(`/api/weather/add`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                temp: data.main.temp,
                feel: feelings.value,
                location: data.name,
                desc: data.weather[0].description,
                icon: data.weather[0].icon,

            })
        })
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Retrieves the weather data for a given zip code,
 * posts it to the server, and retrieves all data from the server.
 * @param {Event} e - The event that triggered the function.
 */
const getZipWeather = (e) => {
    e.preventDefault()
    const zip = zipInput.value
    retrieveWeatherData(zip)
        .then(data => postData(data))
        .then(() => retrieveData())
}
/**
 * Retrieves data from the API and updates the UI with the fetched data.
 */
const retrieveData = async () => {
    const request = await fetch(`/api/all`);
    try {
        const allData = await request.json()
        journalHistory.innerHTML = ""
        if (allData.result.length > 0) {
            weather.classList.add("active")
            entryHolder.classList.add("active")
            journalHistory.classList.add("active")
        }
        allData.result.forEach((element, id) => {
            if (id === allData.result.length - 1) {
                document.getElementById('locationNow').innerHTML = element.location;
                document.getElementById('iconNow').innerHTML = `<img id="icon" src="${WEATHER_ICONS}${element.icon}@4x.png" alt="Current icon weather">`;
                document.getElementById('dateNow').innerHTML = element.date;
                document.getElementById('tempNow').innerHTML = Math.round(element.temp) + ' °F';
                document.getElementById('contentNow').innerHTML = element.feel;
            } else {
                let feeling = document.createElement('div')
                feeling.id = "historyItem"

                let iLocation = document.createElement('div')
                iLocation.id = "location"
                iLocation.innerHTML = element.location
                let iDate = document.createElement('div')
                iDate.id = "date"
                iDate.innerHTML = element.date
                let iTemp = document.createElement('div')
                iTemp.id = "temp"
                iTemp.innerHTML = Math.round(element.temp) + ' °F';
                let iContent = document.createElement('div')
                iContent.id = "content"
                iContent.innerHTML = element.feel

                feeling.appendChild(iLocation)
                feeling.appendChild(iDate)
                feeling.appendChild(iTemp)
                feeling.appendChild(iContent)

                journalHistory.appendChild(feeling)
            }
        });
    }
    catch (error) {
        console.log("error", error);
    }
}
button.addEventListener("click", getZipWeather)
