import React from 'react'
import {Howl} from 'howler'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import StopIcon from '@mui/icons-material/Stop';
// import StopCircleIcon from '@mui/icons-material/StopCircle';

class RadioPlayerEmbed extends React.Component {
    state = { 
        channelStreamURL: "", 
        selectedChannel: "",
        initialized: false,
        isPlaying: false 
    };

    sound;
    constructor(props:any) {
      super(props);
    }

    componentDidMount(): void {
        console.log("RadioPlayerEmbed mounted!!!");
        if (!this.state.isPlaying && this.props.channelStreamURL && this.props.channelStreamURL.length > 0) {
            console.log("channelStreamURL updated");
            this.setState({ channelStreamURL: this.props.channelStreamURL });
            this.playSound();
        }
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate radio player embed");
        console.log(this.props.channelStreamURL);
        // console.log(prevProps.channelStreamURL);
        // console.log(this.props.channelStreamURL);

        // console.log((!this.state.initialized && prevProps.channelStreamURL && prevProps.channelStreamURL.length > 0))
        
        // console.log(prevProps.channelStreamURL !== this.props.channelStreamURL);
        
        if ((!this.state.initialized && prevProps.channelStreamURL && prevProps.channelStreamURL.length > 0) || prevProps.channelStreamURL !== this.props.channelStreamURL) {
            console.log("channelStreamURL updated");
            this.setState({ 
                channelStreamURL: this.props.channelStreamURL,
                initialized: true
            });
            this.playSound(true);
        }
    }
    
    playSound = (newStream) => {
      console.log("playSound");
      if (!(this.state.channelStreamURL && this.state.channelStreamURL.length > 0))
        return;

      if (newStream) {
        // stop existing sound if one exists
        if (this.sound)
          this.sound.unload();
  
        this.sound = new Howl({
          src: [this.state.channelStreamURL],
          html5: true, 
          format: ['mp3', 'aac']
        })

        this.sound.play();
        this.setState({ isPlaying: true });
      //   document.getElementById("radio-player-embed-controls").innerHTML = <StopIcon onClick={this.pauseSound}/>;
        // document.sound = this.sound;
      }
      else {
        this.sound.play();
        this.setState({ isPlaying: true });
      }
    }
    
    pauseSound = () => {
      console.log("pauseSound");
      this.sound.pause();
      this.setState({ isPlaying: false });
    //   document.getElementById("radio-player-embed-controls").innerHTML = <PlayArrowIcon onClick={this.playSound}/>;
    }
    
    resumeSound = () => {
      this.sound.play();
    }
    
    render() {
      return (
        <div id="radio-player-embed">
            <div id="radio-player-embed-controls">
            {/* </div>
        </div> */}
            {this.state.isPlaying === true ? (
                    <div>
                        {console.log("stop icon loading...")}
                        <StopIcon onClick={this.pauseSound}/>
                    </div>
                ) : (<div>
                        {console.log("play icon loading...")}
                        {console.log(this.state.isPlaying)}
                        <PlayArrowIcon onClick={this.playSound}/>
                    </div>)}
           {/* <button onClick={this.playSound}>Play radio!</button>
          <button onClick={this.pauseSound}>Pause radio.</button>
          <button onClick={this.resumeSound}>Resume paused radio.</button> */}
            </div>
        </div>
      )
    }
} 
export default RadioPlayerEmbed;