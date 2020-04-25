import React from 'react';

const FacialRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt4'>
        <img src={imageUrl} alt='' width='500px' height='auto' />
      </div>
    </div>
  );
};

export default FacialRecognition;
