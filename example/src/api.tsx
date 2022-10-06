// https://de1.api.radio-browser.info/
// https://www.npmjs.com/package/radio-browser-api
// https://api.radio-browser.info/
// https://github.com/ivandotv/radio-browser-api#readme
import axios from "axios";

export async function getCountries() {
    const countriesList = axios.get("http://de1.api.radio-browser.info/json/countries");
    var resp;
    await countriesList.then(x => {
        resp = x.data;
    });
    return resp;
}

export async function getStates(country:string) {
    const statesList = axios.get("http://de1.api.radio-browser.info/json/states/" + country);
    return statesList.then(x => {
        return x.data
    });
}

export async function getLanguages() {
    const languagesList = axios.create({
        baseURL: "http://de1.api.radio-browser.info/json/languages",
        method: "GET"
    });
    return languagesList;
}