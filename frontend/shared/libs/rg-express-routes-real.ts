var production = process.env.NODE_ENV === 'production';
var baseURL = production ? 'https://radio.andersan.com' : 'http://localhost:5000';

export async function fetchAllPlacesJSONData() {
    var result = await fetch(baseURL + '/api/radio-direct/places');
    var json = await result.json();
    return json;
}

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

export async function fetchPopularChannelsFromPlace(placeId:string) {
    console.log("fetching data --- fetchPopularChannelsFromPlace");
    return fetch(baseURL + '/api/radio-direct/popular-channels?' + new URLSearchParams({
        placeId: placeId,
    })).then((res) => {
        console.log("res.json() --- fetch popular channels");
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
    console.log("fetching data --- fetchStreamURL 1");
    return fetch(baseURL + '/api/radio-direct/stream?' + new URLSearchParams({
        channelId: channelId,
    })).then((res) => {
        console.log("res.json() --- fetchStreamURL 2");
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