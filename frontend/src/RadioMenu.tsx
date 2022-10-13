import { timeStamp } from 'console';
import React from 'react'
// import { RadioStation } from './api';
import { Channel, Place } from './radio-garden-api';
import "./radio-menu.css"
import RadioPlayerEmbed from './RadioPlayerEmbed';
import {/*fetchSearch, /*fetchSinglePlaceChannels,
fetchSinglePlaceInfo, fetchStreamURL*/} from './rg-express-routes-real'
import {fetchSearch, fetchSinglePlaceChannels,
    fetchSinglePlaceInfo, fetchStreamURL} from './rg-express-test-routes'

class RadioMenu extends React.Component {
    // radio garden api
    state = {
        selectedPlace: null,
        selectedChannel: null,
        streamURL: null,
        isPlaying: false,
    }

    // radio browser api
    // selectedStation:RadioStation;
    
    constructor(props:any) {
        super(props);
  
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
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
        }

        if (prevProps.selectedChannel !== this.props.selectedChannel) {
            console.log("selectedChannel updated");
            this.setState({ selectedChannel: this.props.selectedChannel });
            this.fetchStreamURLLink(this.props.selectedChannel.href.split('/').pop());
        }
    }

    selectPlace(place:Place) {
        this.setState({selectedPlace: place});
    }

    selectChannel(channel:Channel) {
        this.setState({selectedChannel: channel});
    }

    openRadioMenu() {
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
        if (this.isPlaying)
            document.getElementById("radio-menu")?.classList.add("radio-menu-playing");
        else
            document.getElementById("radio-menu")?.classList.add("radio-menu-closed");
    }

    async fetchPlaceChannels(placeId:string) {
        var channels = await fetchSinglePlaceChannels(placeId);
        this.setState({channels: channels});
        document.getElementById("place-channels-info").innerHTML = "Place channels: " + JSON.stringify(channels);
    }

    async fetchPlaceInfo(placeId:string) {
        var placeInfo = await fetchSinglePlaceInfo(placeId);
        document.getElementById("place-general-info").innerHTML = "Place general info: " + JSON.stringify(placeInfo);
        this.setState({selectedPlace: placeInfo});
    }

    async fetchStreamURLLink(channelId:string) {
        var streamURL = await fetchStreamURL(channelId);
        this.setState({streamURL: streamURL});
        console.log("fetchStreamURLLink: " + JSON.stringify(streamURL));
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
                        <p id="place-general-info">
                            Place general info: {JSON.stringify(this.state.selectedPlace)}
                        </p>
                        <p id="place-channels-info">
                            Place channels: {JSON.stringify(this.state.selectedPlace.map)}
                        </p>
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
                {this.state.selectedChannel ? (
                    <RadioPlayerEmbed 
                        selectedChannel={this.state.selectedChannel}
                        // channelStreamURL={ this.fetchStreamURLLink(this.props.selectedChannel.href.split("/").pop())}
                        channelStreamURL={this.state.streamURL}
                    />
                ) : (<div style={{"display":"none"}}></div>)}
                <div id="search-box">
                    <form onSubmit={this.handleSearchSubmit}>
                        <input type="text" id="search-input" placeholder="Search for a radio station"/>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default RadioMenu;