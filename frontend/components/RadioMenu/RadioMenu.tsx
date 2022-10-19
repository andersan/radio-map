import React from 'react'
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

// import { RadioStation } from './api';
// import { Channel, Place } from '../../shared/libs/radio-garden-api';
import {fetchSearch, fetchSinglePlaceChannels, fetchSinglePlaceInfo, fetchStreamURL, fetchSingleChannelInfo} from '../../shared/libs/rg-express-routes-real'
// import {fetchSearch, fetchSinglePlaceChannels, fetchSinglePlaceInfo, fetchStreamURL, fetchSingleChannelInfo} from '../../shared/libs/rg-express-test-routes'

import RadioMenuList from '../RadioMenuList/RadioMenuList';
// import NowPlayingDisplay from './NowPlayingDisplay';
import NowPlayingDisplayMinimal from '../NowPlayingDisplayMinimal/NowPlayingDisplayMinimal';

class RadioMenu extends React.Component {
    // radio garden api
    state = {
        selectedPlace: this.props.selectedPlace,
        selectedChannel: this.props.selectedChannel,
        streamURL: null,
        isPlaying: false,
        isClosed: false,
        playMusicFunc: null,
        pauseMusicFunc: null,
        channels: null,
        mounted: false,
        updateWaitingForMount: false,
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
        this.setState({mounted: true});
        if (this.state.updateWaitingForMount) {
            this.setState({updateWaitingForMount: false});
            this.forceUpdate(this.state.updateWaitingForMount, this);
        }
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate radio menu");
        if (!this.state.mounted) {
            console.log("radio menu not yet mounted");
            this.setState({updateWaitingForMount: prevProps});
        }
        else
            this.forceUpdate(prevProps, this);
    }

    forceUpdate(prevProps, thisFromParent) {
        console.log(prevProps.selectedPlace);
        console.log(thisFromParent.props.selectedPlace);
        console.log(prevProps.selectedChannel);
        console.log(thisFromParent.props.selectedChannel);

        if (prevProps.selectedPlace !== thisFromParent.props.selectedPlace && thisFromParent.props.selectedPlace) {
            console.log("selectedPlace updated");
            thisFromParent.openRadioMenu();
            thisFromParent.setState({ selectedPlace: thisFromParent.props.selectedPlace,
                channels: null });
            // this.fetchPlaceChannels(this.props.selectedPlace.map);
        }

        if (prevProps.selectedChannel !== thisFromParent.props.selectedChannel && thisFromParent.props.selectedChannel) {
            console.log("selectedChannel updated");
            // this.playingRadioMenu();
            thisFromParent.setState({ selectedChannel: thisFromParent.props.selectedChannel });
            thisFromParent.fetchStreamURLLink(thisFromParent.props.selectedChannel.href.split('/').pop());
        }
    }

    async selectChannel(channelId:string) {
        console.log("selectChannel 1");
        // todo get channel info
        this.fetchChannelInfo(channelId).then((channel) => {
            console.log("selectChannel 2");
            console.log(channel);
            this.setState({selectedChannel: channel});
    
            // todo select place of this channel, if not already selected?
            // this.fetchAndSelectPlace(channel.place.id);
    
            this.fetchStreamURLLink(channel.id);
        });
    }

    openRadioMenu() {
        console.log("open radio menu");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-closed");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-playing");
        document.getElementById("radio-menu")?.classList.add("radio-menu-open");
        this.setState({isClosed: false});
    }

    playingRadioMenu() {
        console.log("playing radio menu");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-closed");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-open");
        document.getElementById("radio-menu")?.classList.add("radio-menu-playing");
        this.setState({isClosed: false});
    }

    closeRadioMenu() {
        console.log("close radio menu");
        document.getElementById("radio-menu")?.classList.remove("radio-menu-open");
        if (this.state.isPlaying)
            document.getElementById("radio-menu")?.classList.add("radio-menu-playing");
        else
            document.getElementById("radio-menu")?.classList.add("radio-menu-closed");
        this.setState({isClosed: true});
    }

    async fetchPlaceChannels(placeId:string) {
        var channels = await fetchSinglePlaceChannels(placeId);
        console.log(JSON.stringify(channels));
        this.setState({channels: channels});
        // document.getElementById("place-channels-info").innerHTML = "Place channels: " + JSON.stringify(channels);
    }

    async fetchAndSelectPlace(placeId:string) {
        var placeInfo = await fetchSinglePlaceInfo(placeId);
        // document.getElementById("place-general-info").innerHTML = "Place general info: " + JSON.stringify(placeInfo);
        this.setState({
            selectedPlace: placeInfo,
            channels: null
        });
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

        // TODO: build logic to load a new place, or open popular station page
        // url may also indicate a page, like local popular stations?
        if (item.url && item.url.split("/").pop() === "popular")
            console.log("POPULAR STATIONS -- not yet implemented");
            // this.openPage(item.url);
        else if (item.page && item.page.url.split("/").pop() === "channels")
            // console.log("ALL CHANNELS AT A PLACE -- not yet implemented");
            this.fetchPlaceChannels(item.page.url.split("/")[3]);
        else if (item.page)
            // todo: add breadcrumbs to allow this 
            this.fetchAndSelectPlace(item.page.url.split("/").pop());
        else
            this.selectChannel(item.href.split("/").pop());
    }

    render() {
        return (
        <div className="menu-container">
            <div id="radio-menu" className="radio-menu-closed">
            {  !this.state.isClosed ? (
                <div>
                    {/* <h1>Radio Menu</h1> */}
                    <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', maxWidth: '90%'}}>
                                <CardContent sx={{ flex: '1 0 auto', maxWidth: '90%' }}>
                                    <Typography id="radio-menu-title" variant="h4" component="h4">
                                        { this.state.selectedPlace ? this.state.selectedPlace.title : "Radio Menu"}
                                    </Typography>
                                </CardContent>
                            </Box>

                            {(this.state.isPlaying || this.state.selectedPlace || this.state.selectedChannel) ? <Box className='radio-menu-icon-button' sx={{pl: 1, pb: 1, }} >
                                <IconButton aria-label="close" sx={{alignContent: 'flex-end'}} onClick={() => {this.state.isPlaying ? this.playingRadioMenu() : this.closeRadioMenu()}}>
                                <ExpandMoreRoundedIcon sx={{ height: 38, width: 38 }}></ExpandMoreRoundedIcon>
                                </IconButton>
                            </Box>
                            : <div></div>
                            }
                        </Card>
                    </Grid>
                    {this.state.selectedPlace ? (
                        <div>
                            {
                                this.state.channels ? (
                                    <RadioMenuList
                                    listItems={this.state.channels.content}
                                    selectItem={this.selectItem}>
                                    </RadioMenuList>
                                )
                                :
                                (this.state.selectedPlace ? (
                                    <RadioMenuList
                                    listItems={this.state.selectedPlace.content}
                                    selectItem={this.selectItem}>
                                    </RadioMenuList>
                                ) : (<div></div>))
                            }
                        </div>
                    ) : (
                        <span></span>//<p>Selected Place: None</p>
                    )}
                </div>)
                : (<span>{/* hide header and list if list is closed */}</span>)
            }
                {/* <p>Selected Channel: {JSON.stringify(this.props.selectedChannel)}</p> */}
                {/* {this.state.selectedChannel ? (
                    <p id="selected-channel-info">Selected Channel: {this.state.selectedChannel.title}</p>
                ) : (
                    <p>Selected Channel: None</p>
                )} */}
                {/* {this.state.selectedChannel ? (
                    <RadioPlayerEmbed 
                        selectedChannel={this.state.selectedChannel}
                        // channelStreamURL={ this.fetchStreamURLLink(this.props.selectedChannel.href.split("/").pop())}
                        channelStreamURL={this.state.streamURL}
                    />
                ) : (<div style={{"display":"none"}}></div>)} */}
                {/* <div id="search-box">
                    <form onSubmit={this.handleSearchSubmit}>
                        <input type="text" id="search-input" placeholder="Search for a radio station"/>
                        <button type="submit">Search</button>
                    </form>
                </div> */}
                {this.state.selectedChannel && !this.state.isClosed
                    ? <Divider/>
                    : <div style={{"display":"none"}}></div>}
                {this.state.selectedChannel ? 
                    // <NowPlayingDisplay
                    <NowPlayingDisplayMinimal
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