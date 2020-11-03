# Weather Dashboard

## Description 

The goal of this project was to create a weather dashboard using OpenWeather API to retrieve weather data for cities. The app will run in the browser and store recent searches in the local storage.

## HTML File

The HTML code is a single page that displays today's wear data inside one card, and the forecast into 5 seperate cards.
On the left sidebar is the search field and button, as well as the search history. Bootstrap was used to design the UI.

## Javascript File

The Javascript contains all of the weather dashboard functionality and local storage.

### Open Weather API
There are 3 seperate calls to the API:
* Weather Data (Temperature, Humidity, Wind Speed)
* UV Data
* Forecast Data 

### Local Storage
* Local Storage is used to store the user's search history and display it inside a table
* When the user clicks on the row in the table, the script is run again as though they typed it in again and hit "Search"

## Challenges & Potential Improvements
* I plan to spend some time improving the UI in the future
* I would also like to create and if statement that wont re-add the city to the history if it's already been search. And if it exists, it would move that row to the top of the list.

## Credits

* Fil
* Daniel
* My amazing peers!

## License

Copyright (c) 2020] [Niki Fereidooni]
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
