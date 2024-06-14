import {
    DayOfWeek,
    WeatherIcon,
    WeatherIcontype,
    WeatherResponse,
} from "../model/weatherResponse";

export const buttonClick = document.getElementById("button-location") as HTMLButtonElement | null;
const temperature = document.getElementById("weather-temp") as HTMLElement | null;
const weatherDescription = document.getElementById("weather-desc") as HTMLElement | null;
const weatherIconPng = document.getElementById("weather-icon") as HTMLImageElement | null;
const locationText = document.getElementById("location-text") as HTMLElement | null;
const dateDayName = document.getElementById("date-dayname") as HTMLElement | null;
const dateDay = document.getElementById("date-day") as HTMLElement | null;
const maxTemp = document.getElementById("text-temp-max") as HTMLElement | null;
const minTemp = document.getElementById("text-temp-min") as HTMLElement | null;
const humidity = document.getElementById("text-humidity") as HTMLElement | null;
const wind = document.getElementById("text-wind") as HTMLElement | null;
const locationInput = document.getElementById("weather-location-input") as HTMLInputElement | null;
const loadSpinner = document.getElementById("load-div") as HTMLElement | null;

const htmlSpinner = `
    <div id="load-spinner">
        <div id="load"></div>
    </div>
`;

export const updateInterface = (weather: WeatherResponse): void => {
    temperature && (temperature.textContent = `${Math.floor(weather.main.temp)}ºC`);
    weatherDescription && (weatherDescription.textContent = weather.weather[0].main);
    changeWeatherIcon(weather.weather[0].icon ?? "01d");

    locationText && (locationText.textContent = weather.name);
    dateDayName && (dateDayName.textContent = getDayOfWeek());
    dateDay && (dateDay.textContent = getDate());

    maxTemp && (maxTemp.textContent = `${Math.floor(weather.main.temp_max)} ºC`);
    minTemp && (minTemp.textContent = `${Math.floor(weather.main.temp_min)} ºC`);
    humidity && (humidity.textContent = `${weather.main.humidity} %`);
    wind && (wind.textContent = `${weather.wind.speed} m/s`);
};

export const clearInterface = (): void => {
    temperature && (temperature.textContent = "-- ºC");
    weatherDescription && (weatherDescription.textContent = "--");
    changeWeatherIcon("00");

    locationText && (locationText.textContent = "--");
    dateDayName && (dateDayName.textContent = "--");
    dateDay && (dateDay.textContent = "--");

    maxTemp && (maxTemp.textContent = "-- ºC");
    minTemp && (minTemp.textContent = "-- ºC");
    humidity && (humidity.textContent = "-- %");
    wind && (wind.textContent = "-- m/s");
};

export function getCity(): string {
    return locationInput ? locationInput.value : "";
}

function getDayOfWeek(): string {
    const day = new Date();
    return DayOfWeek[day.getDay()];
}

function getDate(): string {
    const date = new Date();
    return date.toLocaleDateString("es-ES");
}

export function showSpinner() {
    if (loadSpinner) {
        loadSpinner.innerHTML = htmlSpinner;
        loadSpinner.style.visibility = "visible";
        loadSpinner.style.opacity = "1";
    }
}

export function hideSpinner() {
    if (loadSpinner) {
        loadSpinner.innerHTML = "";
        loadSpinner.style.visibility = "hidden";
        loadSpinner.style.opacity = "0";
    }
}

function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = WeatherIcon[weatherMap[0]] ?? WeatherIcon["01d"];
    if (typeof mappedWeather === "string") {
        weatherIconPng && (weatherIconPng.src = mappedWeather);
    }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    if (!values.every(isValidImage)) {
        throw new Error("invalid image");
    }
}

function isValidImage(value: string): value is WeatherIcontype {
    return value in WeatherIcon;
}
