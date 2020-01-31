# weather-dashboard

https://setocourtney.github.io/weather-dashboard/

Weather dashboard application with search functionality to find current weather conditions and the future weather outlook for multiple cities. 


## User Story

As a traveler
I want to see the weather outlook for multiple cities
so that I can plan a trip accordingly


## Function 

* Uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. 

    * Current Weather API
    * 5 Day / 3 Hour Forecast API
    * UV Index API

* App will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

* Displays the following under current weather conditions:

  * City
  * Date
  * Icon image (visual representation of weather conditions)
  * Temperature
  * Humidity
  * Wind speed
  * UV index

* Includes a search history saved to local storage so that users can access their past search terms. Clicking on the city name will perform a new search that returns current and future conditions for that city. 

* Includes 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast displays:

  * Date
  * Icon image (visual representation of weather conditions)
  * Temperature
  * Humidity