// https://de1.api.radio-browser.info/
// https://www.npmjs.com/package/radio-browser-api
// https://api.radio-browser.info/
// https://github.com/ivandotv/radio-browser-api#readme
import axios from "axios";
// import { get_radiobrowser_base_url_random } from './get-api-server'


export interface RadioStation {
    "changeuuid": string,
    "stationuuid": string,
    "serveruuid": string,
    "name": string,
    "url": string,
    "url_resolved": string,
    "homepage": string,
    "favicon": string,
    "tags": [string],
    "country": string,
    "countrycode": string,
    "iso_3166_2": string,
    "state": string,
    "language": string,
    "languagecodes": string,
    "votes": number,
    "lastchangetime": Date,
    "lastchangetime_iso8601": Date,
    "codec": string,
    "bitrate": number,
    "hls": number,
    "lastcheckok": Boolean,
    "lastchecktime": Date,
    "lastchecktime_iso8601": Date,
    "lastcheckoktime": Date,
    "lastcheckoktime_iso8601": Date,
    "lastlocalchecktime": Date,
    "lastlocalchecktime_iso8601": Date,
    "clicktimestamp": Date,
    "clicktimestamp_iso8601": Date,
    "clickcount": number,
    "clicktrend": number,
    "ssl_error": number,
    "geo_lat": number,
    "geo_long": number,
    "has_extended_info": Boolean
}

export interface Country {
    "name": string,
    "iso_3166_1": string,
    "stationcount": number
}

// const host = get_radiobrowser_base_url_random();

export async function getCountries() {
    // const countriesList = await axios.get<Country>(host + "json/countries");//"http://de1.api.radio-browser.info/json/countries");
    const countriesList = await axios.get<Country>("http://de1.api.radio-browser.info/json/countries");//"http://de1.api.radio-browser.info/json/countries");
    return countriesList.data;
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

export async function getStationsByName(keyword:string) {
    const stationsList = await axios.get<RadioStation>("http://de1.api.radio-browser.info/stations/byname/" + keyword);
    return stationsList.data;
}

export async function getStationsByCountry(countryID:string) {
    const stationsList = await axios.get<RadioStation>("http://de1.api.radio-browser.info/json/stations/bycountry/" + countryID);
    return stationsList.data;
}