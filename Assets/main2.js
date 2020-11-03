// Weather API Key

const key = '15e99efa461ece787c60292850024b69'

// Main Function

document.getElementById("searchBtn").addEventListener("click", function () {
    weatherLookup()
});

function weatherLookup() {

    // Pulls city name from user input

    const cityName = $("#cityName").val()

    // First API Call for Main Weather Data (Today's Temperature, Humidity & Wind Speed)

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {

        // Clears Data before appending new weather datga

        $("#cityNameDate").empty();
        $("#temperature").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();
        $("#uvIndex").empty();
        $("#forecast").empty();

        // Function to save search history

        saveHistory(cityName)

        // Append City Name and Today's Date

        let todaysDate = new Date().toLocaleDateString()
        $('#cityNameDate').append(`${cityName.charAt(0).toUpperCase() + cityName.slice(1)} (${todaysDate})`)

        // Pull Longitude and Latitude from first API call to use in UV Data Call

        longitude = response.coord.lon;
        latitude = response.coord.lat;

        // Second API Call Function (UV Data)

        getUVdata()

        // Third API Call Function (Forecast Data)

        getForecastdata()

        // Appends Data from First API Call to main card

        let temperaturediv = $('#temperature')
        temperaturediv.append(`<b>Temperature: </b>${Math.round(parseInt(response.main.temp) - 273.15)} °C`)

        let humiditydiv = $('#humidity')
        humiditydiv.append(`<b>Humidity: </b>${response.main.humidity}%`)

        let windSpeeddiv = $('#windSpeed')
        windSpeeddiv.append(`<b>Wind Speed: </b>${response.wind.speed} meters/sec`)
    });
};

// Second API Call Function (UV Data)

function getUVdata() {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + key;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {

        // Appends Data from Second API Call to main card

        let uvIndexdiv = $('#uvIndex')
        uvIndexdiv.append(`<b>UV Index: </b>${response.value}`)
    });
}

// Third API Call Function (Forecast Data)

function getForecastdata() {
    const cityName = $("#cityName").val()
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        // Assigning API lists to each future date

        let day1 = response.list[4]
        let day2 = response.list[12]
        let day3 = response.list[20]
        let day4 = response.list[28]
        let day5 = response.list[36]

        const forecastArray = [day1, day2, day3, day4, day5];

        let forecastdiv = $('#forecast')

        // Loop through each day to impend data to each forecast card

        for (let i = 0; i < forecastArray.length; i++) {
            let date = moment().add(1 + i, 'days').format('L')
            let icon = forecastArray[i].weather[0].icon
            console.log(icon)
            let temperature = forecastArray[i].main.temp
            console.log(temperature)
            let humidity = forecastArray[i].main.humidity
            console.log(humidity)

            forecastdiv.append(`
            <div class="card col forecastCard">
                <div class="card-body">
                    <h5 class="card-title" id="forecastDate"><b>${date}</b></h5>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
                    <p class="card-text forecast" id="forecastTemp"><b>Temperature: </b>${Math.round(parseInt(temperature) - 273.15)}°C</p>
                    <p class="card-text forecast" id="forecastHumidity"><b>Humidity: </b>${humidity}%</p>
                </div>
            </div>`)
        }
    });
}

// Function to save search history

function saveHistory(cityName) {
    let historyID = 0;

    if (localStorage.getItem("historyID") == undefined) {
        localStorage.setItem("historyID", 0)
    }
    else {
        historyID = localStorage.getItem("historyID");
        ++historyID
    }

    localStorage.setItem(historyID, cityName)
    localStorage.setItem("historyID", historyID)

    $('#searchHistory').empty()

    for (let i = 0; i <= historyID; i++) {

        let city = localStorage.getItem(i)
        $('#searchHistory').append(`<tr><td><button id="row${i + 1}" class="btn btn-sm btn-dark">` + city + `</button></td></tr>`)

        document.getElementById(`row${i + 1}`).addEventListener("click", function () {
            $("#cityName").val(city)
            weatherLookup()
        });
    }
}

// Function to display search history

function displayHistory() {
    let historyID = localStorage.getItem("historyID");
    for (let i = 0; i < historyID; i++) {
        let cityName = localStorage.getItem(i)
        $('#searchHistory').append(`<tr><td><button id="row${i + 1}" class="btn btn-sm btn-dark">` + cityName + `</button></td></tr>`)
    }
}

displayHistory()

// Clear History Function

function clearHistory() {
    localStorage.clear();
    $('#searchHistory').empty();
}



