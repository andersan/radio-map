var production = process.env.NODE_ENV === 'production';
var baseURL = production ? 'http://radio.andersan.com' : 'http://localhost:5000';

export async function fetchSinglePlaceInfo(placeId:string) {
    console.log("fetching data --- fetchSinglePlaceInfo");
    return fetch(baseURL + '/api/radio-direct/place-info?' + new URLSearchParams({
        placeId: placeId,
    })).then((res) => {
        console.log("res.json() --- fetch single place info");
        return res.json()
    });
}

export async function fetchSinglePlaceChannels(placeId:string) {
    console.log("fetching data --- fetchSinglePlaceChannels");
    return fetch(baseURL + '/api/radio-direct/place-channels?' + new URLSearchParams({
        placeId: placeId,
    })).then((res) => {
        console.log("res.json() --- fetch single place channels");
        return res.json()
    });
}



export async function fetchSingleChannelInfo(channelId:string) {
    console.log("fetching data --- fetchSingleChannelInfo");
    return fetch(baseURL + '/api/radio-direct/channel-info?' + new URLSearchParams({
        channelId: channelId,
    })).then((res) => {
        console.log("res.json() --- fetched single channel info");
        return res.json()
    });
}

export async function fetchStreamURL(channelId:string) {
    console.log("fetching data --- fetchStreamURL");
    return fetch(baseURL + '/api/radio-direct/stream?' + new URLSearchParams({
        channelId: channelId,
    })).then((res) => {
        console.log("res.json() --- fetchStreamURL");
        return res.json()
    });
}

export async function fetchSearch(searchQuery:string) {
    console.log("fetching data --- fetchSearch");
    return fetch(baseURL + '/api/radio-direct/search?' + new URLSearchParams({
        searchQuery: searchQuery,
    })).then((res) => {
        console.log("res.json() --- fetch search");
        return res.json()
    });
}