import React from 'react'
// import { RadioStation } from './api';
import { Channel, Place } from '../APIs/radio-garden-api';
import "./radio-menu.css"
import {/*fetchSearch, /*fetchSinglePlaceChannels,
fetchSinglePlaceInfo, fetchStreamURL*/ fetchSingleChannelInfo} from '../APIs/rg-express-routes-real'
import {fetchSearch, fetchSinglePlaceChannels,
    fetchSinglePlaceInfo, fetchStreamURL, /*fetchSingleChannelInfo*/} from '../APIs/rg-express-test-routes'
import RadioMenuList from './RadioMenuList';
import NowPlayingDisplay from './NowPlayingDisplay';

class RadioMenu extends React.Component {
    // radio garden api
    state = {
        selectedPlace: null,
        selectedChannel: null,
        streamURL: null,
        isPlaying: false,
        playMusicFunc: null,
        pauseMusicFunc: null,
    }

    // radio browser api
    // selectedStation:RadioStation;
    
    constructor(props:any) {
        super(props);
  
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    componentDidMount(): void {
        // alert("RadioMenu mounted!!!");
        console.warn("RadioMenu mounted!!!");
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate radio menu");
        console.log(prevProps.selectedPlace);
        console.log(this.props.selectedPlace);
        console.log(prevProps.selectedChannel);
        console.log(this.props.selectedChannel);

        if (prevProps.selectedPlace !== this.props.selectedPlace) {
            console.log("selectedPlace updated");
            this.setState({ selectedPlace: this.props.selectedPlace });
            this.fetchPlaceChannels(this.props.selectedPlace.map);
            this.openRadioMenu();
        }

        if (prevProps.selectedChannel !== this.props.selectedChannel) {
            console.log("selectedChannel updated");
            this.setState({ selectedChannel: this.props.selectedChannel });
            this.fetchStreamURLLink(this.props.selectedChannel.href.split('/').pop());
        }
    }

    // async selectPlace(placeId:string) {
    //     // todo get place info
    //     var place = await this.fetchSinglePlaceInfo
    //     this.setState({selectedPlace: placeId});
    // }

    async selectChannel(channelId:string) {
        console.log("selectChannel 1");
        // todo get channel info
        this.fetchChannelInfo(channelId).then((channel) => {
            console.log("selectChannel 2");
            console.log(channel);
            this.setState({selectedChannel: channel});
    
            // todo select place of this channel, if not already selected?
            this.fetchPlaceInfo(channel.place.id);
    
            this.fetchStreamURLLink(channel.id);
        });
    }

    openRadioMenu() {
        console.log("open radio menu");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-closed");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-playing");
        document.getElementById("radio-menu")?.classList.add("radio-menu-open");
    }

    playingRadioMenu() {
        document.getElementById("radio-menu")?.classList.remove("radio-menu-closed");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-open");
        document.getElementById("radio-menu")?.classList.add("radio-menu-playing");
    }

    closeRadioMenu() {
        document.getElementById("radio-menu")?.classList.remove("radio-menu-open");
        if (this.state.isPlaying)
            document.getElementById("radio-menu")?.classList.add("radio-menu-playing");
        else
            document.getElementById("radio-menu")?.classList.add("radio-menu-closed");
    }

    async fetchPlaceChannels(placeId:string) {
        var channels = await fetchSinglePlaceChannels(placeId);
        this.setState({channels: channels});
        // document.getElementById("place-channels-info").innerHTML = "Place channels: " + JSON.stringify(channels);
    }

    async fetchPlaceInfo(placeId:string) {
        var placeInfo = await fetchSinglePlaceInfo(placeId);
        // document.getElementById("place-general-info").innerHTML = "Place general info: " + JSON.stringify(placeInfo);
        this.setState({selectedPlace: placeInfo});
    }

    async fetchStreamURLLink(channelId:string) {
        var streamCallResponse = await fetchStreamURL(channelId);
        this.setState({streamURL: streamCallResponse.streamURL});
        console.log("fetchStreamURLLink: " + JSON.stringify(streamCallResponse));
    }

    async fetchChannelInfo(channelId:string) {
        var channelInfo = await fetchSingleChannelInfo(channelId);
        console.log("fetchChannelInfo" + JSON.stringify(channelInfo));
        return channelInfo;
    }

    async runSearch(query:string) {
        var searchResults = await fetchSearch(query);
        this.setState({searchResults: searchResults});
        console.log("fetchSearch: " + JSON.stringify(searchResults));
        // document.getElementById("search-results").innerHTML = "Search results: " + JSON.stringify(searchResults);
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        var searchTerm = document.getElementById("search-input")?.value;
        if (searchTerm) {
            console.log("HANDLE SEARCH SUBMIT: " + searchTerm);
            this.runSearch(searchTerm);
        }
    }
    // selectStation(station:RadioStation) {
    //     this.selectedStation = station;
    // }

    // item will have a structure like the following:
    /*
    channel: {"map":"ILSa1N2P","href":"/listen/wordpress/ILSa1N2P","title":"Majic 104.3 - WMJU","subtitle":"Buda TX"} or {"href":"/listen/kmfa/g72kAOBD","title":"KMFA FM 89.5"}
    place: {"page":{"map":"C63FqHXQ","url":"/visit/georgetown-tx/C63FqHXQ","type":"page","count":2,"title":"Georgetown TX","subtitle":"United States"},"title":"Georgetown TX","rightDetail":"41 km"} or {"page":{"map":"LbmJqSyY","url":"/visit/san-francisco-ca/LbmJqSyY","type":"page","count":102,"title":"San Francisco CA","subtitle":"United States"},"title":"San Francisco CA","leftAccessory":"count","leftAccessoryCount":102}

    TODO: check what data types actually correspond to this "place" and "channel"
    */
    selectItem(item:any) {
        console.log("selectItem " + JSON.stringify(item));
        if (item.page)
            this.fetchPlaceInfo(item.page.url.split("/").pop());
        else
            this.selectChannel(item.href.split("/").pop());
    }

    render() {
        return (
        <div className="menu-container">
            <div id="radio-menu" className="radio-menu-closed">
                <h1>Radio Menu</h1>
                {/* <p style={{color: "blue", zIndex: 1000000000}}>Selected Place: {JSON.stringify(this.props.selectedPlace)}</p> */}
                {this.state.selectedPlace ? (
                    <div>
                        <p>
                            Selected Place: {this.state.selectedPlace.title}
                        </p>
                        {
                            this.state.selectedPlace ? (
                                <RadioMenuList
                                listItems={this.state.selectedPlace.content}
                                selectItem={this.selectItem}>
                                </RadioMenuList>
                            ) : (<div></div>)
                        }
                        {/* <p id="place-general-info">
                            Place general info: {JSON.stringify(this.state.selectedPlace)}
                        </p>
                        <p id="place-channels-info">
                            Place channels: {JSON.stringify(this.state.selectedPlace.map)}
                        </p> */}
                    </div>
                ) : (
                    <p>Selected Place: None</p>
                )}
                {/* <p>Selected Channel: {JSON.stringify(this.props.selectedChannel)}</p> */}
                {this.state.selectedChannel ? (
                    <p id="selected-channel-info">Selected Channel: {this.state.selectedChannel.title}</p>
                ) : (
                    <p>Selected Channel: None</p>
                )}
                {/* {this.state.selectedChannel ? (
                    <RadioPlayerEmbed 
                        selectedChannel={this.state.selectedChannel}
                        // channelStreamURL={ this.fetchStreamURLLink(this.props.selectedChannel.href.split("/").pop())}
                        channelStreamURL={this.state.streamURL}
                    />
                ) : (<div style={{"display":"none"}}></div>)} */}
                <div id="search-box">
                    <form onSubmit={this.handleSearchSubmit}>
                        <input type="text" id="search-input" placeholder="Search for a radio station"/>
                        <button type="submit">Search</button>
                    </form>
                </div>
                {this.state.selectedChannel ? 
                    <NowPlayingDisplay
                    selectedChannel={this.state.selectedChannel} 
                    selectedPlace={this.state.selectedPlace} 
                    streamURL={this.state.streamURL}/>
                    : <div style={{"display":"none"}}></div>}
            </div>
        </div>
        )
    }
}

export default RadioMenu;