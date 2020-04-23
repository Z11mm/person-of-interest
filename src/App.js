import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/image-input-form/ImageInputForm';
import Rank from './components/rank/Rank';
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
    };
  }

  handleInputChange = e => {
    console.log(e.target.value);
  };

  handleSubmit = () => {
    console.log('click');
    app.models
      .predict(
        'a403429f2ddf4b49b307e318f00e528b',
        'https://samples.clarifai.com/face-det.jpg'
      )
      .then(
        function (response) {
          console.log(response);
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
        {/*  <FacialRecognition /> */}
      </div>
    );
  }
}

export default App;
