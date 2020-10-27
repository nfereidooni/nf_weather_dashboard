// Weather API Key

const key = '15e99efa461ece787c60292850024b69'

// 

document.getElementById("searchBtn").addEventListener("click", function () {
    const cityName = $("#cityName").val()

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

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



});


function getUVdata() {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + key;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let uvIndexdiv = $('#uvIndex')
        uvIndexdiv.append(`UV Index: ${response.value}`)
    });
}

function getForecastdata() {
    const cityName = $("#cityName").val()
    console.log(cityName)
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let day1 = response.list[4].main
        let day2 = response.list[12].main
        let day3 = response.list[20].main
        let day4 = response.list[28].main
        let day5 = response.list[36].main

        let forecastdiv = $('forecastCards')
        
        for (let i = 0; i < 5; i++) {
            day = "day" + (i+1)
            console.log(day)
            temperature = String(day.temp)
            console.log(temperature)
        

            forecastdiv.append(`
            <div class="card col-2 forecastCard">
                <div class="card-body">
                    <h5 class="card-title" id="forecastDate">${forcastDate}</h5>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
                    <p class="card-text forcast">Temperature: ${temp}°C</p>
                    <p class="card-text forcast">Humidity: ${humidity}%</p>
                </div>
            </div>`)  
        }


    });
}