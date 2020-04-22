import React from 'react'

import './ImageInputForm.css';

const ImageInputForm = () => {
  return (
    <div>
      <p className='f5'>{'This is magic'}</p>

      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input type='text' className='f3 pa2 w-70 center' />
          <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-blue'>
            Detect Faces
          </button>
        </div>
      </div>
    </div>
  );
 }

export default ImageInputForm