// work off of Google MUI example here:
// https://mui.com/material-ui/react-card/ (UI-Controls section)

import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
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

import howlerPlayer from '../APIs/howler-player';

export default class NowPlayingDisplay extends React.Component {
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
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {this.state.selectedChannel ? this.state.selectedChannel.title : this.state.selectedPlace ? this.state.selectedPlace.title : "Live From Space"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {this.state.selectedChannel ? this.state.selectedChannel.subtitle : this.state.selectedPlace ? this.state.selectedPlace.subtitle : "Live From Space"}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
                  {false ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause" onClick={this.state.isPlaying ? () => {
                  this.player.pauseSound();
                  this.setState({ isPlaying: false});
                } : () => {
                  this.player.playSound();
                  this.setState({ isPlaying: true});
                }}>
                  {this.state.isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }}/>: <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                </IconButton>
                <IconButton aria-label="next">
                  {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
                  {false ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="https://i.discogs.com/i709t8jr7r_w4sePutqH8L7rujxngjcJvxw3vfvc5B4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMDU3/Njg3LTE1NDkzNzIx/NTAtMTkxMC5qcGVn.jpeg"
              alt="kery james j'rap encore album cover"
            />
          </Card>
        ) : (<div></div>)}
      </div>
    );
  }
}