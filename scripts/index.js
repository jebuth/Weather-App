/**
 * 
 * UI Elements Module
 * this moduel will be responsible for controlling UI elements like 'menu'
 * 
 */

const UI = (function(){
    const showApp = () => {
        
        // add 'display-none' class to #app - loader
        document.querySelector("#app-loader").classList.add('display-none');

        // remove 'hidden' attribute from main
        document.querySelector("main").removeAttribute('hidden');

    };
    const loadApp = () => {
        document.querySelector("#app-loader").classList.remove('display-none');
        document.querySelector("main").setAttribute('hidden', true);
    }
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