
const apiKey = "16e02387f67e85ab07e0a1d2479a3936";

const city = "Seattle";
// const recentCitiesArr;

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}&units=imperial`;


const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#city-search");
const citiesEl = document.querySelector("#recent-cities");

const cityHeaderEl = document.querySelector("#city-header");
const cityDataEl = document.querySelector("#city-data");
const tempEl = document.querySelector("#temp");
const humidEl = document.querySelector("#humid");
const windEl = document.querySelector("#wind");
const uvEl = document.querySelector("#uv");

const forecastEl = document.querySelector("#forecast");


var date = parseDate(new Date());
console.log(date);

getWeatherAPI();
getForecastAPI();


function getWeatherAPI() {
    fetch(weatherURL)
        .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        var weatherObj = json;
        console.log(weatherObj);

        //weather header
        var nameEl = document.createElement("h2");
        nameEl.textContent = city;
        var dateEl = document.createElement("h4");
        dateEl.textContent = date;
        //icon from openweather
        var icon = document.createElement("img");
        var iconID = weatherObj.weather[0].icon;
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`)
        cityHeaderEl.innerHTML = "";
        cityHeaderEl.appendChild(nameEl);
        cityHeaderEl.appendChild(dateEl);
        cityHeaderEl.appendChild(icon);

        //city weather info
        tempEl.innerHTML = weatherObj.main.temp + "&#176;" + "F";
        humidEl.innerHTML = weatherObj.main.humidity + "%";
        windEl.innerHTML = weatherObj.wind.speed + "MPH";
        getUV(weatherObj.coord.lat, weatherObj.coord.lon);
   })
};

function getUV(lat, lon) {
    const uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    fetch(uvURL)
        .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        var uvResponse = json;
        uvIndex = uvResponse.value;
        if(uvIndex < 3) {
            uvEl.style.color = "green";
        } else if(uvIndex > 7) {
            uvEl.style.color = "red";
        } else {
            uvEl.style.color = "yellow";
        }
        uvEl.innerHTML = uvIndex;
   })

}

function getForecastAPI() {
    fetch(forecastURL)
        .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        var forecastObj = json;
        console.log(forecastObj);
        var thisDate = parseDate(new Date(forecastObj.list[0].dt * 1000));
        console.log(thisDate);


        // //weather header
        // var nameEl = document.createElement("h2");
        // nameEl.textContent = city;
        // var dateEl = document.createElement("h4");
        // dateEl.textContent = date;
        // //icon from openweather
        // var icon = document.createElement("img");
        // var iconID = weatherObj.weather[0].icon;
        // icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`)
        // cityHeaderEl.innerHTML = "";
        // cityHeaderEl.appendChild(nameEl);
        // cityHeaderEl.appendChild(dateEl);
        // cityHeaderEl.appendChild(icon);

        // //city weather info
        // tempEl.innerHTML = weatherObj.main.temp + "&#176;" + "F";
        // humidEl.innerHTML = weatherObj.main.humidity + "%";
        // windEl.innerHTML = weatherObj.wind.speed + "MPH";
        // getUV(weatherObj.coord.lat, weatherObj.coord.lon);
   })
};

function parseDate(date) {
    var newDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    return newDate;
};

//get city input - initializes with most recent search
    //replace spaces with "+"
//get api data
//get list of recent searches from local storage
//parse list of recent searches

//parse api data
//display city info
    //check uv index
//display forecast

//add city input to local storage array - prepend, so most recent is at 0





