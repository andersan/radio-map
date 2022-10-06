import React from 'react'
import {Howl} from 'howler'

class RadioPlayer extends React.Component {
    constructor() {
      super()
      
      this.sound = new Howl({
        src: ['https://uk3.internet-radio.com/proxy/majesticjukebox?mp=/live']
      })

      // sound.play();
    }
    
    handleCorrect = () => {
      var input = document.getElementById("url") as HTMLInputElement;
      console.log("url: " + input.value);
      this.sound = new Howl({
        src: [input.value],
        html5: true, 
        format: ['mp3', 'aac']
      })
      console.log("handleCorrect");
      this.sound.play();
    }
    
    render() {
      return (
        <div>
          <button onClick={this.handleCorrect}>Play radio!</button>

          try this url: https://uk3.internet-radio.com/proxy/majesticjukebox?mp=/live
          <p></p>
          <input id="url"></input>
        </div>
      )
    }
} 
export default RadioPlayer;