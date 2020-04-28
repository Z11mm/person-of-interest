import React from 'react';

const Navigation = ({onRouteChange}) => (
  <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <p onClick={() => onRouteChange('signin')} className='f4 link dim gray underline pa3 pb0 pointer'>Sign Out</p>
  </nav>
);

export default Navigation;
