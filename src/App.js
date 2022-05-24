import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Login from './pages/Login';
import StartGame from './pages/Game';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route
          path="/game"
          render={ (props) => <StartGame { ...props } /> }
        />
        <Route
          path="/settings"
          render={ (props) => <Settings { ...props } /> }
        />
      </Switch>
    );
  }
}

export default App;
