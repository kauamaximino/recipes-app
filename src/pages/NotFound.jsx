import React from 'react';
// import trash from '../images/trash.png';
import hunger from '../images/hunger2.png';

const NotFound = () => (
  <div className="conteiner-logo">
    <img className="logo" src={ hunger } alt="trash" />
    <h1 className="title display-3">Oh no! Page not found.</h1>
  </div>
);

export default NotFound;
