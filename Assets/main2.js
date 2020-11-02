// Weather API Key

const key = '15e99efa461ece787c60292850024b69'
citySaved = []

// Main Function

document.getElementById("searchBtn").addEventListener("click", function () {
    weatherLookup()
});

function weatherLookup() {
    const cityName = $("#cityName").val()

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        $("#cityNameDate").empty();
        $("#temperature").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();
        $("#uvIndex").empty();
        $("#forecast").empty();

        saveHistory(cityName)

        let todaysDate = new Date().toLocaleDateString()
        $('#cityNameDate').append(`${cityName.charAt(0).toUpperCase() + cityName.slice(1)} (${todaysDate})`)

        longitude = response.coord.lon;
        latitude = response.coord.lat;

        getUVdata()

        getForecastdata()

        let temperaturediv = $('#temperature')
        temperaturediv.append(`Temperature: ${Math.round(parseInt(response.main.temp) - 273.15)} °C`)

        let humiditydiv = $('#humidity')
        humiditydiv.append(`Humidity: ${response.main.humidity}%`)

        let windSpeeddiv = $('#windSpeed')
        windSpeeddiv.append(`Wind Speed: ${response.wind.speed} meters/sec`)
    });
};

// UV API Call

function getUVdata() {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + key;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        let uvIndexdiv = $('#uvIndex')
        uvIndexdiv.append(`UV Index: ${response.value}`)
    });
}

// Forecast API Call

function getForecastdata() {
    const cityName = $("#cityName").val()
    // console.log(cityName)
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let day1 = response.list[4]
        let day2 = response.list[12]
        let day3 = response.list[20]
        let day4 = response.list[28]
        let day5 = response.list[36]

        const forecastArray = [day1, day2, day3, day4, day5];

        let forecastdiv = $('#forecast')

        for (let i = 0; i < forecastArray.length; i++) {
            let date = moment().add(1 + i, 'days').format('L')
            // console.log(date)
            let icon = forecastArray[i].weather[0].icon
            console.log(icon)
            let temperature = forecastArray[i].main.temp
            console.log(temperature)
            let humidity = forecastArray[i].main.humidity
            console.log(humidity)

            forecastdiv.append(`
            <div class="card col forecastCard">
                <div class="card-body">
                    <h5 class="card-title" id="forecastDate">${date}</h5>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
                    <p class="card-text forecast">Temperature: ${temperature}°C</p>
                    <p class="card-text forecast">Humidity: ${humidity}%</p>
                </div>
            </div>`)
        }


    });
}

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

        // Set City Name

        document.getElementById(`row${i + 1}`).addEventListener("click", function () {
            $("#cityName").val(city)
            weatherLookup()
        });
    //     document.getElementById(`row${i + 1}`).addEventListener("click", weatherLookup);
    }
}

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



