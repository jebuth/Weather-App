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


    // menu events
    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);
    
    //hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").addEventListener('click', _toggleHourlyWeather);


    return{
        showApp,
        loadApp
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