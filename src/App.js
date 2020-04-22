import React from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/image-input-form/ImageInputForm';
import Rank from './components/rank/Rank';
import './App.css';

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
      }
    },
  },
};

function App() {
  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputForm />
      {/*  <FacialRecognition /> */}
    </div>
  );
}

export default App;
