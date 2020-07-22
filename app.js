// api key : 82005d27a116c2880c8f0fcb866998a0

const notifiElement= document.querySelector(".notification");
const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperature-value p");
const descElement= document.querySelector(".temperature-description p");
const locationElement= document.querySelector(".location p");


const weather = {};

weather.temperature ={ 
    unit : 'celsius'
}
const KELVIN =273;

const key = "82005d27a116c2880c8f0fcb866998a0";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else{
    notifiElement.style.display = "block";
    notifiElement.innerHTML= "<P> Browser do not support </P>"
}

function setPosition(Position){
    let latitude = Position.coords.latitude;
    let longitude = Position.coords.longitude;
    
    getweather(latitude, longitude)

}

function showError(error){
    notifiElement.style.display = "block";
    notifiElement.innerHTML =  `<p> ${error.message}</p>`;
}

function getweather(latitude, longitude) {

    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    fetch(api) 
        .then(function(response){
            let data =response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })

        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;

}
    tempElement.addEventListener("click", function(){
        if(weather.temperature.value === undefined) return;
        
        if(weather.temperature.unit == "celsius"){
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);
            
            tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit = "fahrenheit";
        }else{
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit = "celsius"
        }
    });
    