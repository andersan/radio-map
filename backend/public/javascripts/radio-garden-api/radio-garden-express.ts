import {Place, SearchApi, PlacesApi, SearchResult, ChannelsApi, PlaceContentContentInner, AraContentPagePlaceIdGet200ResponseAllOfData, SelectedStations, ChannelRef, LocalPickStations, LocalPopularStations, AraContentPagePlaceIdChannelsGet200Response, AraContentPagePlaceIdChannelsGet200ResponseAllOfData} from "./api"
import AxiosResponse from "axios"
import axios from "axios";
import { inspect } from 'util'

// https://jonasrmichel.github.io/radio-garden-openapi/ api doc

// flows when using radio-garden api directly:
// 1. populate map places:
// use the PlacesApi().araContentPlacesGet() call to get a list of all places (13k+ places)

// 2. search for a station: 
// use the SearchApi().searchGet(query) to search.

// 3. list details about a specific place:
// araContentPagePlaceIdGet

// 4. get all stations("channels") from specific place:
// araContentPagePlaceIdChannelsGet


export async function getAllPlacesInRG():Promise<Place[]|undefined> {
    return (await new PlacesApi().araContentPlacesGet()).data?.data?.list;
} 

export async function getSpecificPlace(place:Place):Promise<AraContentPagePlaceIdGet200ResponseAllOfData|undefined> {
    // return a list of lists, including a list of stations, a button to get all stations, a button to show stations popular in the city, a list of nearby cities/places, and more
    return (await new PlacesApi().araContentPagePlaceIdGet(place.id!)).data?.data;
} 

export async function getAllChannelsInSpecificPlace(place:Place):Promise<AraContentPagePlaceIdChannelsGet200ResponseAllOfData|undefined> {
    // return a list of lists, including a list of stations, a button to get all stations, a button to show stations popular in the city, a list of nearby cities/places, and more
    return (await new PlacesApi().araContentPagePlaceIdChannelsGet(place.id!)).data?.data;
} 

// returns a list of both stations and channels that match the search query
export async function searchPlacesAndChannels(query:string):Promise<SearchResult[]|undefined> {
    return (await new SearchApi().searchGet(query)).data?.hits?.hits;
} 

// export async function getStreamUrl(channelId:string):Promise<AxiosResponse<void,any>> {
    // the below call often causes an error rather than returning a 302 (redirect) with a URL as expected.
    // return (await new ChannelsApi().araContentListenChannelIdChannelMp3Head(channelId));

    // the below call returns a stream but doesn't disconnect the call (never pauses the stream). Need to get a URL to route to front-end and not sure how to disconnect the stream. 
    // return (await new ChannelsApi().araContentListenChannelIdChannelMp3Get(channelId));
// }

export async function customGetStreamUrl(channelId:string):Promise<string|undefined> {
    var url = "http://radio.garden/api/ara/content/listen/" + channelId + "/channel.mp3?_=1614040000000";
    var stream = (await axios.head(url, {headers: {"User-Agent": "curl/7.68.0", "Host": "radio.garden", "Accept": "*/*"}, transformRequest: function(data, headers) {
        delete headers.common;
        return data;
    }}, ));
    setTimeout(() => { 
        console.log("stream keys: " + Object.keys(stream));
        // console.log("stream headers: " + JSON.stringify(stream.headers));
        // console.log(inspect(stream, true, 3));
        console.log(inspect(stream, true, 5).match(/https?:\/\/[^"']+listening-from[^"']+/g)!);
        console.log("hm");
    }, 2000);
    
    return inspect(stream, true, 5).match(/https?:\/\/[^"']+listening-from[^"']+/g)![0];
}

export async function getSomeStream(/*channelId:string*/):Promise<string|undefined> {
    var placeList = await getAllPlacesInRG();

    var place = placeList![Math.floor(Math.random() * placeList!?.length)];

    var placeContentInnerList = await (await getSpecificPlace(place)).content;

    // log to server console's output
    // console.log("placeContentInner", JSON.stringify(placeContentInnerList));
    
    // log unique list of types in placeContentInner's items
    // console.log("placeContentInner", placeContentInner?.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index));

    // get a channel that has the property itemType
    // console.log("placeContentInner keys: " + placeContentInnerList.map(place => Object.keys(place)));

    var singlePlaceContentInner:LocalPickStations|LocalPopularStations|SelectedStations = placeContentInnerList?.filter(placeInfo => "itemsType" in placeInfo && placeInfo["itemsType"] === "channel")[0];

    // console.log("singlePlaceContentInner: ", singlePlaceContentInner);

    // print types of the singlePlaceContentInner items
    // console.log("singlePlaceContentInner items: " + singlePlaceContentInner.items?.map(item => typeof item));

    // get a channel from the singlePlaceContentInner items
    var channel:ChannelRef = singlePlaceContentInner.items[0] as ChannelRef;

    console.log("channel: ", channel);
    
    var channelId:string = channel.href.split("/").pop()!;

    var stream = await customGetStreamUrl(channelId);
    
    return stream;
}