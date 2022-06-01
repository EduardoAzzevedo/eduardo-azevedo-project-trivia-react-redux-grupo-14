import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

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
        <Route
          path="/feedback"
          render={ (props) => <Feedback { ...props } /> }
        />
        <Route
          path="/ranking"
          render={ (props) => <Ranking { ...props } /> }
        />
      </Switch>
    );
  }
}

export default App;
