// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=15e99efa461ece787c60292850024b69
// api.openweathermap.org/data/2.5/weather?q={cityname}&appid={API key}
// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

// standard ajax call
// unit 6 - activity 3

async function weatherLookup(name) {

    $("#cityNameDate").empty();
    $("#temperature").empty();
    $("#humidity").empty();
    $("#windSpeed").empty();
    $("#uvIndex").empty();

    if (localStorage.getItem("historyID") == undefined) {
        localStorage.setItem("historyID", 0)
    }
    
    let historyID = localStorage.getItem("historyID");

    let key = '15e99efa461ece787c60292850024b69'
    let cityName = (name == undefined ? $("#cityName").val() : name)
    // let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)

    
    // .then(function(resp) {
    //     return resp.json() 
    // })
    // // .then(async function(resp) {
    // //     let uvData = await fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=43.7&lon=-79.42&appid=15e99efa461ece787c60292850024b69`)
    // // })
    // .catch(function() {
    // });
    let todaysDate = new Date().toLocaleDateString()
    $('#cityNameDate').append(`${cityName.charAt(0).toUpperCase() + cityName.slice(1)} (${todaysDate})`)

    // Weather API AJAX Call

    let weatherDataURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
    let longitude;
    let latitude;
    
    $.when($.ajax({
        url: weatherDataURL,
        type: 'GET',
        success: function(data){
          return data;
        }
      })).done(function(data){
        longitude = data.coord.lon;
        latitude = data.coord.lat;

        let temperaturediv = $('#temperature')
        temperaturediv.append(`Temperature: ${Math.round(parseInt(data.main.temp) - 273.15)} °C`)
    
        let humiditydiv = $('#humidity')
        humiditydiv.append(`Humidity: ${data.main.humidity}%`)
    
        let windSpeeddiv = $('#windSpeed')
        windSpeeddiv.append(`Wind Speed: ${data.wind.speed} meters/sec`)
        weatherDataURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${key}`;
        $.when($.ajax({ 
            url: weatherDataURL,
            type: "GET",
            success: function(data){
              return data;
            }
        })).done(function(uvdata){
          let uvIndexdiv = $('#uvIndex')
          uvIndexdiv.append(`UV Index: ${uvdata.value}`)
        })
      });

// 5 Day Forecast API Call

    weatherDataURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;
    
    $.when($.ajax({
        url: weatherDataURL,
        type: 'GET',
        success: function(data){
          return data;
        }
      })).done(function(data){
    
        console.log(data)

        let dayOne = data.list[4].main
        let dayTwo = data.list[12].main
        let dayThree = data.list[20].main
        let dayFour = data.list[28].main
        let dayFive = data.list[36].main

        let temp = dayOne.temp

        console.log(data)



        // for loop

        // let humiditydiv = $('#humidity')
        // humiditydiv.append(`Humidity: ${data.main.humidity}%`)
    });

// Local Storage


    localStorage.setItem(historyID, cityName)

    historyID++
    localStorage.setItem("historyID", historyID)

    $('#searchHistory').empty()
    for (let i=0; i < historyID; i++) {
        
        cityName = localStorage.getItem(i)
        $('#searchHistory').append(`<tr id="row${i+1}"> <td>` + cityName + `</td></tr>`)
        
        document.getElementById(`row${i+1}`).addEventListener("click", setCityName);        
        document.getElementById(`row${i+1}`).addEventListener("click", weatherLookup);
      
        
    }


}

// Retrieve/Display Event Function
  
function displayHistory() {
    let historyID = localStorage.getItem("historyID");
    for (let i=0; i < historyID; i++){
        let cityName = localStorage.getItem(i)  
        $('#searchHistory').append(`<tr id="row${i+1}"> <td>` + cityName + `</td></tr>`)
    }
  }

displayHistory()

// Clear History Function

function clearHistory() {
    localStorage.clear();
    $('#searchHistory').empty();
}


// Set City Name

// function setCityName() {
//   //grab the correct row that was clicked
//   //set cityName to whatever the cityName in the td is
//     var rowId = $(this).attr("id")
//     cityName = $(this).siblings
// }


// Open Weather API
// Local Storage


// S1 When you type in the city name and click search
// - Pulls weather information from API
// - Adds city searched to history
// - Displays City Name and Today's Date
// - Displays today's Temperature (main.temp), Humidity(main.humidity), Wind Speed(wind.speed) and UV Index (coordinates - value)
// - Populates 5 day weather forecast with dates, icon representing weather, temperature and humidity


// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// ```
