import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route
          path="/game"
          render={ (props) => <Game { ...props } /> }
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
