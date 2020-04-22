import React from 'react';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageInputForm from './components/image-input-form/ImageInputForm';
import Rank from './components/rank/Rank';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputForm />
      {/*  <FacialRecognition /> */}
    </div>
  );
}

export default App;
