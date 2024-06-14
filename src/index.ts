// Style import
import "./styles/main.scss";
import {
    buttonClick,
    getCity,
    updateInterface,
    clearInterface,
    showSpinner,
    hideSpinner,
} from "./dom-manipulation/domManipulation";
import { getWeatherPromises } from "./networking/weather";

export const displayWeather = async () => {
    const city = getCity();
    if (city !== "") {
        showSpinner();
        (<HTMLInputElement>buttonClick).disabled = true;
        try {
            const response = await getWeatherPromises(city);
            updateInterface(response);
        } catch (error) {
            clearInterface();
            alert("Error, no se encontró ciudad, intentelo de nuevo");
        } finally {
            hideSpinner();
            (<HTMLInputElement>buttonClick).disabled = false;
        }
    }
};

if (buttonClick) {
    buttonClick.addEventListener("click", displayWeather);
}
