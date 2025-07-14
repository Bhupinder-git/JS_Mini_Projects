// ===========================================
// WEATHER APP - ORGANIZED SCRIPT
// ===========================================

// ===========================================
// DOM ELEMENTS SELECTION
// ===========================================
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector("[data-grantAccess]");
const searchInput = document.querySelector("[data-searchInput]");

// Weather display elements
const cityName = document.querySelector("[data-cityName]");
const countryIcon = document.querySelector("[data-countryIcon]");
const desc = document.querySelector("[data-weatherDesc]");
const weatherIcon = document.querySelector("[data-weatherIcon]");
const temp = document.querySelector("[data-temp]");
const windspeed = document.querySelector("[data-windspeed]");
const humidity = document.querySelector("[data-humidity]");
const cloudiness = document.querySelector("[data-cloudiness]");

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let currentTab = userTab;
const API_KEY = "iDeDgo9XOgtV7w03bQyYxw==FipXJ5BZkKv07HBr";
const DEFAULT_COORDS = { latitude: 30.70547, longitude: 76.22196 }; // Chandigarh

// ===========================================
// INITIALIZATION
// ===========================================
function init() {
    currentTab.classList.add("current-tab");
    attachEventListeners();
    getFromSessionStorage();
}

// ===========================================
// EVENT LISTENERS
// ===========================================
function attachEventListeners() {
    userTab.addEventListener('click', () => switchTab(userTab));
    searchTab.addEventListener('click', () => switchTab(searchTab));
    grantAccessButton.addEventListener('click', getLocation);
    searchForm.addEventListener('submit', handleSearchSubmit);
}

function handleSearchSubmit(e) {
    e.preventDefault();
    const cityName = searchInput.value.trim();
    if (cityName === "") return;
    fetchSearchWeatherInfo(cityName);
}

// ===========================================
// TAB SWITCHING FUNCTIONALITY
// ===========================================
function switchTab(clickedTab) {
    if (clickedTab === currentTab) return;
    
    // Remove active class from current tab
    currentTab.classList.remove("current-tab");
    // Update current tab
    currentTab = clickedTab;
    // Add active class to new current tab
    currentTab.classList.add("current-tab");
    
    // Hide all containers first
    hideAllContainers();
    
    if (clickedTab === searchTab) {
        // Show search form
        searchForm.classList.add("active");
    } else {
        // Show user weather - check for saved coordinates
        getFromSessionStorage();
    }
}

// ===========================================
// UI CONTAINER MANAGEMENT
// ===========================================
function hideAllContainers() {
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.remove("active");
    loadingScreen.classList.remove("active");
}

function showLoadingScreen() {
    hideAllContainers();
    loadingScreen.classList.add("active");
}

function showUserInfo() {
    hideAllContainers();
    userInfoContainer.classList.add("active");
}

function showGrantAccess() {
    hideAllContainers();
    grantAccessContainer.classList.add("active");
}

function showSearchForm() {
    hideAllContainers();
    searchForm.classList.add("active");
}

function showSearchForm_showUserInfo(){
    hideAllContainers();
    searchForm.classList.add("active");
    userInfoContainer.classList.add("active");
}

// ===========================================
// WEATHER DATA MAPPING
// ===========================================
function getWeatherDescriptionDetailed(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };
    
    return weatherCodes[code] || "Unknown weather condition";
}

function getWeatherIconUrl(code) {
    const iconUrls = {
        0: "./icons/clear-sky.png",
        1: "./icons/mainly-clear.png",
        2: "./icons/partly-cloudy.png",
        3: "./icons/overcast.png",
        45: "./icons/fog.png",
        48: "./icons/rime-fog.png",
        51: "./icons/light-drizzle.png",
        53: "./icons/moderate-drizzle.png",
        55: "./icons/dense-drizzle.png",
        56: "./icons/light-freezing-drizzle.png",
        57: "./icons/dense-freezing-drizzle.png",
        61: "./icons/slight-rain.png",
        63: "./icons/moderate-rain.png",
        65: "./icons/heavy-rain.png",
        66: "./icons/light-freezing-rain.png",
        67: "./icons/heavy-freezing-rain.png",
        71: "./icons/slight-snow.png",
        73: "./icons/moderate-snow.png",
        75: "./icons/heavy-snow.png",
        77: "./icons/snow-grains.png",
        80: "./icons/slight-rain-showers.png",
        81: "./icons/moderate-rain-showers.png",
        82: "./icons/violent-rain-showers.png",
        85: "./icons/slight-snow-showers.png",
        86: "./icons/heavy-snow-showers.png",
        95: "./icons/thunderstorm.png",
        96: "./icons/thunderstorm-slight-hail.png",
        99: "./icons/thunderstorm-heavy-hail.png"
    };
    
    return iconUrls[code] || "./icons/unknown.png";
}

// ===========================================
// API FUNCTIONS
// ===========================================
async function getGeocode(city) {
    try {
        const baseURL = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(city)}`;
        const options = {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        };
        const response = await fetch(baseURL, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching geocode:", error);
        throw error;
    }
}

async function getCity(latitude = DEFAULT_COORDS.latitude, longitude = DEFAULT_COORDS.longitude) {
    try {
        const baseURL = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`;
        const options = {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        };
        const response = await fetch(baseURL, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching city:", error);
        throw error;
    }
}

async function fetchWeatherInfo(latitude, longitude) {
    try {
        const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,cloud_cover,wind_speed_10m,rain,precipitation,showers,snowfall,weather_code,pressure_msl,surface_pressure&timezone=auto`;
        const response = await fetch(baseURL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather info:", error);
        throw error;
    }
}

// ===========================================
// STORAGE FUNCTIONS
// ===========================================
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        showGrantAccess();
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

function saveCoordinatesToSession(coordinates) {
    sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
}

// ===========================================
// WEATHER FETCHING FUNCTIONS
// ===========================================
async function fetchUserWeatherInfo(coordinates) {
    const { latitude, longitude } = coordinates;
    
    showLoadingScreen();
    
    try {
        const weatherData = await fetchWeatherInfo(latitude, longitude);
        const locationData = await getCity(latitude, longitude);
        
        showUserInfo();
        renderWeatherInfo(weatherData, locationData[0]);
    } catch (error) {
        console.error("Error fetching user weather info:", error);
        hideAllContainers();
        showError("Failed to fetch weather information. Please try again.");
    }
}

async function fetchSearchWeatherInfo(city) {
    showLoadingScreen();
    
    try {
        const geocodeData = await getGeocode(city);
        
        if (!geocodeData || geocodeData.length === 0) {
            hideAllContainers();
            showSearchForm();
            showError("City not found. Please try a different city name.");
            return;
        }
        
        const locationData = geocodeData[0];
        const weatherData = await fetchWeatherInfo(locationData.latitude, locationData.longitude);
        
        // showUserInfo();
        // showSearchForm();
        showSearchForm_showUserInfo();
        renderWeatherInfo(weatherData, locationData);
        
        // Clear search input
        searchInput.value = "";
    } catch (error) {
        console.error("Error fetching search weather info:", error);
        hideAllContainers();
        showError("Failed to fetch weather information. Please try again.");
    }
}

// ===========================================
// RENDERING FUNCTIONS
// ===========================================
function renderWeatherInfo(weatherInfo, locationData) {
    try {
        const weatherCode = weatherInfo.current.weather_code;
        const weatherDesc = getWeatherDescriptionDetailed(weatherCode);
        const temperature = Math.round(weatherInfo.current.temperature_2m);
        const countryCode = locationData.country;
        
        // Update DOM elements
        cityName.innerText = locationData.name || "Unknown City";
        countryIcon.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
        countryIcon.alt = `${countryCode} flag`;
        desc.innerText = weatherDesc;
        weatherIcon.src = getWeatherIconUrl(weatherCode);
        weatherIcon.alt = weatherDesc;
        temp.innerHTML = `${temperature}°C`;
        windspeed.innerText = `${weatherInfo.current.wind_speed_10m} km/h`;
        humidity.innerText = `${weatherInfo.current.relative_humidity_2m}%`;
        cloudiness.innerText = `${weatherInfo.current.cloud_cover}%`;
    } catch (error) {
        console.error("Error rendering weather info:", error);
        showError("Error displaying weather information.");
    }
}

// ===========================================
// GEOLOCATION FUNCTIONS
// ===========================================
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const userCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    
    saveCoordinatesToSession(userCoordinates);
    fetchUserWeatherInfo(userCoordinates);
}

// ===========================================
// ERROR HANDLING
// ===========================================
function showError(message) {
    console.error(message);
    // You can implement a proper error display here
    alert(message);
}

// ===========================================
// INITIALIZE APP
// ===========================================
document.addEventListener('DOMContentLoaded', init);