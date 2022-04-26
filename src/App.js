import React from 'react';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';

function App() {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
}

export default App;
