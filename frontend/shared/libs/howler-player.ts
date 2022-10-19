import { Channel } from "./radio-garden-api"
import {Howl} from 'howler'

class howlerPlayer {
  channelStreamURL: string; 
  selectedChannel: Channel;
  initialized: boolean;
  isPlaying: boolean;
  player: Howl;
  
  constructor() {
    this.initialized = false;
    this.isPlaying = false;
  }
  
  playSound = () => {
    console.log("playSound");

    if (!this.channelStreamURL || !this.channelStreamURL.length)
      return;

    if (this.player) {
      this.player.unload();
    }
    
    this.player = new Howl({
      src: [this.channelStreamURL],
      html5: true, 
      format: ['mp3', 'aac']
    })

    this.player.play();
    this.initialized = true;
    // console.log(this.player);
    // document.player = this.player;
  }
  
  pauseSound = () => {
    console.log("pauseSound");
    if (this.player) {
      this.player.pause();
      this.isPlaying = false
    }
  }
  
  resumeSound = () => {
    if (this.player) {
      this.player.play();
      this.isPlaying = true;
    }
  }
}

export default howlerPlayer;