/**
 * 
 * UI Elements Module
 * this moduel will be responsible for controlling UI elements like 'menu'
 * 
 */

const UI = (function(){
    let menu = document.querySelector("#menu-container");

    // hide loading screen and show app
    const showApp = () => {
        // add 'display-none' class to #app - loader
        document.querySelector("#app-loader").classList.add('display-none');

        // remove 'hidden' attribute from main
        document.querySelector("main").removeAttribute('hidden');

    };

    // hide app and show loading screen
    const loadApp = () => {
        document.querySelector("#app-loader").classList.remove('display-none');
        document.querySelector("main").setAttribute('hidden', true);
    }

    // show menu
    const _showMenu = () => menu.style.right = 0;
    
    // hide menu
    const _hideMenu = () => menu.style.right = '-65%';

    const _toggleHourlyWeather = () => {

        // check state of hourly weather panel, if not visible, show it.
        let hourlyWeather = document.querySelector("#hourly-weather-wrapper"),
            arrow = document.querySelector("#toggle-hourly-weather").children[0],
            visible = hourlyWeather.getAttribute('visible'),
            dailyWeather = document.querySelector("#daily-weather-wrapper");

        if(visible == 'false'){
            hourlyWeather.setAttribute('visible', 'true');
            hourlyWeather.style.bottom = 0; // why this line and previous line?
            arrow.style.transform = "rotate(180deg)";
            dailyWeather.style.opacity = 0 // hide daily weather panel
            
        }
        else if(visible == 'true'){
            hourlyWeather.setAttribute('visible', 'false');
            hourlyWeather.style.bottom = '-100%'; // why this line and previous line?
            arrow.style.transform = "rotate(0deg)";
            dailyWeather.style.opacity = 1; // hide daily weather panel
            
        }
        else console.error("Unknown state of the hourly weather panel and visible attribute");

    };

    const drawWeatherData = (data, location) =>{
        console.log(data)
        console.log(location)

        let currentlyData = data.currently;

        // set city name in UI
        document.querySelectorAll(".location-label").forEach((e) => {
            e.innerHTML = location;
        });

        // set background img
        document.querySelector('main').style.backgroundImage= `url("./assets/images/bg-images/${currentlyData.icon}.jpg")`;

        // set icon
        document.querySelector("#currentlyIcon").setAttribute('src', `./assets/images/summary-icons/${currentlyData.icon}-white.png`);

        //set summary
        document.querySelector("#summary-label").innerHTML = currentlyData.summary;

        // set temperature from Fahreneit -> Celcius
        document.querySelector("#degrees-label").innerHTML = Math.round((currentlyData.temperature - 32) * 5 / 9) + '&#176;'

        // set humidity
        document.querySelector("#humidity-label").innerHTML = Math.round(currentlyData.humidity * 100) + '%';

        // set wind speed
        document.querySelector("#wind-speed-label").innerHTML = (currentlyData.windSpeed * 1.6093).toFixed(1) + 'kph';

        UI.showApp();
    };

    // menu events
    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);
    
    //hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").addEventListener('click', _toggleHourlyWeather);


    return{
        showApp,
        loadApp,
        drawWeatherData
    }

})();

/**
 * Get location module
 * 
 */

const GETLOCATION = (function(){
    let location;

    const locationInput = document.querySelector("#location-input"),
        addCityBtn = document.querySelector("#add-city-btn");

    const _addCity = () =>{
        location = locationInput.value;
        locationInput.value = "";
        addCityBtn.setAttribute('disabled', 'true');
        addCityBtn.classList.add('disabled');

        WEATHER.getWeather(location);
    }

    locationInput.addEventListener('input', function(){

        let inputText = this.value.trim();

        if(inputText != ''){
            addCityBtn.removeAttribute('disabled');
            addCityBtn.classList.remove('disabled');
        }
        else{
            addCityBtn.setAttribute('disabled', 'true');
            addCityBtn.classList.add('disabled');
        }
    })

    addCityBtn.addEventListener('click', _addCity);

})();

/**
 * 
 * Get weather data from dark sky api
 * 
 */
const WEATHER = (function(){

    // private keys for api
    const darkSkyKey = '9f6ff95bc5e8490a724e4e8a95156cad',
        geoCoderKey = '6d761e3da3f5434384888c86978cdd12';

    // return valid URL for OpenCage api
    const _getGeoCodeURL = (location) =>
    `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geoCoderKey}`;

    // return valid URL for DarkSky api
    const _getDarkSkyURL = (lat, lng) =>
    `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;

    // get weather data from Dark Sky
    const _getDarkSkyData = (url, location) => {
        axios.get(url)
        .then((res) => {
            console.log(res);
            UI.drawWeatherData(res.data, location);
        })
        .catch ((err) =>{
            console.error(err);
        })
    }


    const getWeather = (location) => {
        UI.loadApp();

        let geoCodeURL = _getGeoCodeURL(location);
        
        axios.get(geoCodeURL)
            .then((res) =>{
                let lat = res.data.results[0].geometry.lat,
                    lng = res.data.results[0].geometry.lng;

                let darkSkyURL = _getDarkSkyURL(lat, lng);
                _getDarkSkyData(darkSkyURL, location);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return{
        getWeather
    }

})();



/**
 * 
 * Init
 * 
 */

window.onload = function(){
    UI.showApp();
}

