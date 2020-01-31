
const apiKey = "16e02387f67e85ab07e0a1d2479a3936";

var city = "";
var recentCitiesArr = [];

const searchBoxDiv = document.querySelector("#search-box");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#city-search");
const clearBtn = document.querySelector("#clear-cities");
const citiesList = document.querySelector("#recent-cities");
const cityButtons = document.querySelectorAll(".city-button");

const cityHeader = document.querySelector("#city-header");
const cityDataDiv = document.querySelector("#city-data");
const tempDiv = document.querySelector("#temp");
const humidDiv = document.querySelector("#humid");
const windDiv = document.querySelector("#wind");
const uvDiv = document.querySelector("#uv");

const forecastDiv = document.querySelector("#forecast");


var date = "";
initializeVars();

//set current date and display recent cities, initialize with most recently searched city
function initializeVars() {
    date = parseDate(new Date());
    getSavedCities();
    city = recentCitiesArr[recentCitiesArr.length - 1];
    parseCities();
    getWeatherAPI();
    getForecastAPI();
};

//city search event listener
searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    city = cityInput.value;
    cityInput.value = "";
    getWeatherAPI();
    getForecastAPI();
});

//clear recently searched cities
clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    recentCitiesArr = [];
    localStorage.setItem("recentCities", JSON.stringify(recentCitiesArr));
    parseCities();
});

//accepts date object and returns formatted string mm/dd/yyyy
function parseDate(date) {
    var newDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return newDate;
};

function getSavedCities() {
    recentCitiesArr = JSON.parse(localStorage.getItem("recentCities"));
    if (!recentCitiesArr) {
        recentCitiesArr = [];
    };
};

function addRecentCity() {
    //update recent cities array, move most recent search to top
    if (recentCitiesArr.indexOf(city) > -1) {
        recentCitiesArr.splice(recentCitiesArr.indexOf(city), 1);
    }
    recentCitiesArr.push(city);
    //save to recent cities to local storage
    localStorage.setItem("recentCities", JSON.stringify(recentCitiesArr));
    parseCities();
};

//display list of recently searched cities
function parseCities() {
    getSavedCities();
    citiesList.innerHTML = "";
    for (i = 0; i < recentCitiesArr.length; i++) {
        var cityLi = document.createElement("li");
        cityLi.setAttribute("class", "list-group-item city-button rounded");
        cityLi.innerHTML = recentCitiesArr[i];
        //add event listener to change city and run api's
        cityLi.addEventListener("click", function (e) {
            e.preventDefault();
            city = this.innerText;
            getWeatherAPI();
            getForecastAPI();
        });
        citiesList.prepend(cityLi);
    };
};

//access openweather current weather api
function getWeatherAPI() {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var weatherObj = json;
            if (!weatherObj.name) {
                cityHeader.innerHTML = weatherObj.message;
                tempDiv.innerHTML = "";
                humidDiv.innerHTML = "";
                windDiv.innerHTML = "";
                uvDiv.innerHTML = "";
                city = "";
            } else {
                //weather header
                var nameHeader = document.createElement("h2");
                //add proper capitalization
                city = weatherObj.name;
                nameHeader.textContent = city;
                var dateHeader = document.createElement("h4");
                dateHeader.textContent = date;
                //icon from openweather
                var icon = document.createElement("img");
                var iconID = weatherObj.weather[0].icon;
                icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`)
                cityHeader.innerHTML = "";
                cityHeader.appendChild(nameHeader);
                cityHeader.appendChild(dateHeader);
                cityHeader.appendChild(icon);

                //city weather info
                tempDiv.innerHTML = weatherObj.main.temp + "&#176;" + "F";
                humidDiv.innerHTML = weatherObj.main.humidity + "%";
                windDiv.innerHTML = weatherObj.wind.speed + "MPH";
                getUV(weatherObj.coord.lat, weatherObj.coord.lon);
                addRecentCity();
            };
        });
};

//access openweather uv api given lat and lon of city
function getUV(lat, lon) {

    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

    fetch(uvURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var uvResponse = json;
            uvIndex = uvResponse.value;

            if (uvIndex < 3) {
                uvDiv.style.color = "green";
            } else if (uvIndex > 7) {
                uvDiv.style.color = "red";
            } else {
                uvDiv.style.color = "yellow";
            }
            uvDiv.innerHTML = uvIndex;
        })

}

//access open weather api for 5 day forecast, returns array of forecast in 3 hr increments
function getForecastAPI() {

    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}&units=imperial`;

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {

            var forecastObj = json;
            forecastDiv.innerHTML = "";

            //get every 8th object for (24hrs per day/3hr increments)
            for (i = 0; i < 40; i += 8) {
                //create daily forecast container
                var listItem = forecastObj.list[i];
                var listDiv = document.createElement("div");
                listDiv.setAttribute("class", "col forecast-item bg-light m-1 rounded p-2");

                //add forecast date
                var thisDate = parseDate(new Date(listItem.dt * 1000));
                var dateDiv = document.createElement("h5");
                dateDiv.textContent = thisDate;
                //icon from openweather
                var icon = document.createElement("img");
                icon.setAttribute("class", "forecast-icon");
                var iconID = listItem.weather[0].icon;
                icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`)
                listDiv.appendChild(dateDiv);
                listDiv.appendChild(icon);

                //forecast details for temp and humid
                var listTemp = document.createElement("div");
                listTemp.innerHTML = "Temp:   " + listItem.main.temp + "&#176;" + "F";
                var listHumid = document.createElement("div");
                listHumid.innerHTML = "Humid:   " + listItem.main.humidity + "%";
                listDiv.appendChild(listTemp);
                listDiv.appendChild(listHumid);
                forecastDiv.appendChild(listDiv);
            };
        });
};






//get city input - initializes with most recent search
    //replace spaces with "+"
//get list of recent searches from local storage
//parse list of recent searches

//add city input to local storage array - prepend, so most recent is at 0





