import React from 'react'
import {Howl} from 'howler'

class RadioPlayerTest extends React.Component {
    sound;
    constructor(props:any) {
      super(props)
      
      this.sound = new Howl({
        autoplay: true,
        src: ['https://uk3.internet-radio.com/proxy/majesticjukebox?mp=/live']
      })

      // sound.play();
    }
    
    playSound = () => {
      // stop existing sound if one exists
      if (this.sound)
        this.sound.unload();

      var input = document.getElementById("url") as HTMLInputElement;
      console.log("url: " + input.value);
      this.sound = new Howl({
        src: [input.value],
        html5: true, 
        format: ['mp3', 'aac']
      })
      console.log("handleCorrect");
      this.sound.play();
      // document.sound = this.sound;
    }
    
    pauseSound = () => {
      this.sound.pause();
    }
    
    resumeSound = () => {
      this.sound.play();
    }
    
    render() {
      return (
        <div>
          <button onClick={this.playSound}>Play radio!</button>
          <button onClick={this.pauseSound}>Pause radio.</button>
          <button onClick={this.resumeSound}>Resume paused radio.</button>
          <br></br>
          try this url: https://uk3.internet-radio.com/proxy/majesticjukebox?mp=/live
          <p></p>
          or this one: https://jking.cdnstream1.com/b75154_128mp3
          <br></br>
          <input id="url"></input>
        </div>
      )
    }
} 
export default RadioPlayerTest;