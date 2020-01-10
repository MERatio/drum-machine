import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';

const audios = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'clap',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486483/drum-machine/audios/clap.wav'
  }, 
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'hihat',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486483/drum-machine/audios/hihat.wav'
  }, 
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'kick',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486482/drum-machine/audios/kick.wav'
  }, 
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'openhat',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486484/drum-machine/audios/openhat.wav'
  }, 
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'boom',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486483/drum-machine/audios/boom.wav'
  }, 
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'ride',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486484/drum-machine/audios/ride.wav'
  }, 
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'snare',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486483/drum-machine/audios/snare.wav'
  }, 
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'tom',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486485/drum-machine/audios/tom.wav'
  }, 
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'tink',
    url: 'https://res.cloudinary.com/dwj9dfm5m/video/upload/v1578486483/drum-machine/audios/tink.wav'
  }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playAudio();
    }
  }
  
  playAudio(e) {
    const pad = document.getElementById(this.props.keyCode);
    const audio = document.getElementById(this.props.keyTrigger);
    audio.currentTime = 0;
    audio.play();
    pad.classList.add('playing');
    pad.addEventListener('transitionend', this.removeTransition); // if the CSS trasition property ended
    this.props.updateDisplay(this.props.id);
  }

  removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  render() {
    return (
      <div 
        className="drum-pad" 
        id={this.props.keyCode}
        onClick={this.playAudio}
      >
        {this.props.keyTrigger}
        <audio src={this.props.url} className="clip" id={this.props.keyTrigger}></audio>
      </div>
    );
  }
}

class PadContainer extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    let pads = audios.map(audio => {
      return <DrumPad
        keyCode={audio.keyCode} 
        keyTrigger={audio.keyTrigger}
        id={audio.id}
        url={audio.url}
        key={audio.id}
        updateDisplay={this.props.updateDisplay} />
    });
    
    return (
      <div id="pad-container">
        {pads}
      </div> 
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ''
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(audioName) {
    this.setState({display: audioName})
  }

  render() {
    return (
      <main>
        <div id="drum-machine">
          <PadContainer updateDisplay={this.updateDisplay}/>
          <p id="display">{this.state.display}</p>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));