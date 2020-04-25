import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/image-input-form/ImageInputForm';
import Rank from './components/rank/Rank';
import FacialRecognition from './components/facial-recognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '88005c5ed5844cbeadf1dcd9c209611b',
});

const particlesOptions = {
  particles: {
    number: {
      value: 180,
      density: {
        enable: 'true',
        value_area: 789,
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: 'true',
        mode: 'repulse',
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      input: e.target.value
    })
  };

  handleSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageInputForm
          onInputChange={this.handleInputChange}
          onButtonSubmit={this.handleSubmit}
        />
        <FacialRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
