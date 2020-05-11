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
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '125',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  createUser = data => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    }));
  };

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

  handleImageSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.setBoundingBox(this.calculateFaceRegion(response));
      })
      .catch(err => console.log(err));
  };

  handleRouteChange = route => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.handleRouteChange}
        />

        {route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageInputForm
              onInputChange={this.handleInputChange}
              onButtonSubmit={this.handleImageSubmit}
            />
            <FacialRecognition boundingBox={box} imageUrl={imageUrl} />
          </Fragment>
        ) : route === 'signin' ? (
          <SignIn
            createUser={this.createUser}
            onRouteChange={this.handleRouteChange}
          />
        ) : (
          <SignUp
            createUser={this.createUser}
            onRouteChange={this.handleRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
