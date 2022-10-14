var production = process.env.NODE_ENV === 'production';
var baseURL = production ? 'http://radio.andersan.com' : 'http://localhost:5000';

export async function fetchData() {
    console.log("fetching data --- frontend express test");
    // return fetch('http://radio.andersan.com/some/random/address').then((res) => {
    return fetch(baseURL + '/api/express').then((res) => {
            console.log("res.json() --- frontend express test");
        return res.text()
    });
}

export async function fetchAllPlacesJSONData() {
    console.log("fetching data --- fetchAllPlacesJSONData");
    
    return fetch('https://d3fdikzwbmnd8q.cloudfront.net/radio/places-export-curl.json').then((res) => {
    // return fetch('https://andersan.s3.amazonaws.com/radio/places-export-curl.json').then((res) => {
    // return fetch('http://radio.andersan.com/api/express/json').then((res) => {
        console.log("res.json() --- frontend express test");
        return res.json()
    });
}

export async function fetchSinglePlaceInfo(placeID:string) {
    console.log("fetching data --- fetchSinglePlaceInfo");
    return fetch(baseURL + '/api/express/place-info').then((res) => {
        console.log("res.json() --- frontend express test");
        return res.json()
    });
}

export async function fetchSinglePlaceChannels(placeID:string) {
    console.log("fetching data --- fetchSinglePlaceChannels");
    return fetch(baseURL + '/api/express/place-channels').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}

export async function fetchStreamURL(channelId:string) {
    console.log("fetching data --- fetchSinglePlaceChannels");
    return fetch(baseURL + '/api/express').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}

export async function fetchSearch(searchQuery:string) {
    console.log("fetching data --- fetchSearch");
    return fetch(baseURL + '/api/express/search').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}