export async function fetchData() {
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express').then((res) => {
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
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express/json').then((res) => {
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
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express/place-info').then((res) => {
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
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express/place-channels').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}