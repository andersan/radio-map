// smaller version of NowPlayingDisplay.tsx for when the radio menu is open.
// hide image or any other unnecessary elements

// work off of Google MUI example here:
// https://mui.com/material-ui/react-card/ (UI-Controls section)

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

import howlerPlayer from '../../shared/libs/howler-player';

export default class NowPlayingDisplayMinimal extends React.Component {
  state = {
    isPlaying: false,
    selectedPlace: null,
    selectedChannel: null,
    streamURL: null,
  }
  player:howlerPlayer;
  // const theme = useTheme();

  constructor(props:any) {
    super(props);
    this.state  = {
      isPlaying: false,
      selectedPlace: props.selectedPlace,
      selectedChannel: props.selectedChannel,
      streamURL: props.streamURL,
    }
    this.player = new howlerPlayer();
  }

  componentDidMount(): void {
      // alert("RadioMenu mounted!!!");
      console.warn("NowPlayingDisplay mounted!!!");
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate NowPlayingDisplay");
    console.log(prevProps.selectedPlace);
    console.log(this.props.selectedPlace);

    if (prevProps.selectedPlace !== this.props.selectedPlace) {
      console.log("selectedPlace updated");
      this.setState({ selectedPlace: this.props.selectedPlace});
    }

    if (prevProps.selectedChannel !== this.props.selectedChannel) {
      console.log("selectedChannel updated");
      this.setState({ selectedChannel: this.props.selectedChannel});
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      console.log("isPlaying updated");
      this.setState({ isPlaying: this.props.isPlaying});
    }

    if (prevProps.streamURL !== this.props.streamURL) {
      console.log("streamURL updated");
      this.setState({ streamURL: this.props.streamURL});
      this.player.channelStreamURL = this.props.streamURL;
      this.player.playSound();
      this.setState({ isPlaying: true});
    }
  }

  render () {
    return (
      <div id="now-playing-display-container">
        { this.state.streamURL ? (
          <Card sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '90%' }}>
              <CardContent sx={{ flex: '1 0 auto', maxWidth: '90%' }}>
                <Typography component="div" variant="h5">
                  {this.state.selectedChannel ? this.state.selectedChannel.title : this.state.selectedPlace ? this.state.selectedPlace.title : "Station name not found"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {/* TODO: display the channel's place's name below the channel's name */}
                  {this.state.selectedChannel && this.state.selectedChannel.subtitle ? this.state.selectedChannel.subtitle : this.state.selectedChannel.country ? this.state.selectedChannel.country.title  /* could also use place title, this.state.selectedChannel.place.title */: this.state.selectedPlace ? this.state.selectedPlace.subtitle : null}
                </Typography>
              </CardContent>
            </Box>
              <Box className='radio-menu-icon-button' sx={{pl: 1, pb: 1  }} >
                <IconButton aria-label="play/pause" onClick={this.state.isPlaying ? () => {
                  this.player.pauseSound();
                  this.setState({ isPlaying: false});
                } : () => {
                  this.player.playSound();
                  this.setState({ isPlaying: true});
                }}>
                  {this.state.isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }}/>: <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                </IconButton>
              </Box>
          </Card>
        ) : (<div></div>)}
      </div>
    );
  }
}