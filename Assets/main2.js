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

        let day1 = response.list[4]
        let day2 = response.list[12]
        let day3 = response.list[20]
        let day4 = response.list[28]
        let day5 = response.list[36]

        let forecastdiv = $('forecast')

        temp1 = day1.temp
        humidity1 = day1.humidity
        console.log(temp1)
        console.log(humidity1)


        for (let i = 0; i < 5; i++) {
            let date = moment().add(1 + i, 'days').format('L')
            // console.log(date)
            let icon = `day${i+1}.weather.0.icon`
            console.log(icon)
            let temperature = `day${i+1}.main.temp`
            console.log(temperature)
            // console.log(day1.temp)
            let humidity = `day${i+1}.main.humidity`
            console.log(humidity)
            // console.log(day1.humidity)

            forecastdiv.append(`
            <div class="card col-2 forecastCard">
                <div class="card-body">
                    <h5 class="card-title" id="forecastDate">${date}</h5>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
                    <p class="card-text forcast">Temperature: ${temperature}°C</p>
                    <p class="card-text forcast">Humidity: ${humidity}%</p>
                </div>
            </div>`)  
        }


    });
}