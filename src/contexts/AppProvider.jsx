import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = { email, setEmail, password, setPassword };

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.props,
}.isRequired;

export default AppProvider;
