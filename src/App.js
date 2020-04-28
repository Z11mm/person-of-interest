import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/image-input-form/ImageInputForm';
import Rank from './components/rank/Rank';
import FacialRecognition from './components/facial-recognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '88005c5ed5844cbeadf1dcd9c209611b'
});

const particlesOptions = {
  particles: {
    number: {
      value: 180,
      density: {
        enable: 'true',
        value_area: 789
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: 'true',
        mode: 'repulse'
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    };
  }

  calculateFaceRegion = data => {
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: faceRegion.top_row * height,
      leftCol: faceRegion.left_col * width,
      bottomRow: height - faceRegion.bottom_row * height,
      rightCol: width - faceRegion.right_col * width
    };
  };

  setBoundingBox = box => {
    console.log(box);
    this.setState({ box });
  };

  handleInputChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setBoundingBox(this.calculateFaceRegion(response)))
      .catch(err => console.log(err));
  };

  handleRouteChange = route => {
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.handleRouteChange} />

        {this.state.route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank />
            <ImageInputForm
              onInputChange={this.handleInputChange}
              onButtonSubmit={this.handleSubmit}
            />
            <FacialRecognition
              boundingBox={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </Fragment>
        ) : this.state.route === 'signin' ? (
          <SignIn onRouteChange={this.handleRouteChange} />
        ) : (
          <SignUp onRouteChange={this.handleRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
