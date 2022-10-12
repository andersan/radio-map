export async function fetchData() {
    console.log("fetching data --- frontend express test");
    // return fetch('http://radio.andersan.com/some/random/address').then((res) => {
    return fetch('http://radio.andersan.com/api/express').then((res) => {
            console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.text()
    });
}

export async function fetchAllPlacesJSONData() {
    console.log("fetching data --- fetchAllPlacesJSONData");
    
    return fetch('https://d3fdikzwbmnd8q.cloudfront.net/radio/places-export-curl.json').then((res) => {
    // return fetch('https://andersan.s3.amazonaws.com/radio/places-export-curl.json').then((res) => {
    // return fetch('http://radio.andersan.com/api/express/json').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}

export async function fetchSinglePlaceInfo(placeID:string) {
    console.log("fetching data --- fetchSinglePlaceInfo");
    return fetch('http://radio.andersan.com/api/express/place-info').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}

export async function fetchSinglePlaceChannels(placeID:string) {
    console.log("fetching data --- fetchSinglePlaceChannels");
    return fetch('http://radio.andersan.com/api/express/place-channels').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}