import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './pages/Login';
// import Foods from './pages/Foods';
// import Drinks from './pages/Drinks';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/foods" component={ Foods } /> */}
        {/* <Route exact path="/drinks" component={ Drinks } /> */}
      </Switch>
    </AppProvider>
  );
}

export default App;
