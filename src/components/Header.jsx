import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" src="" alt="" />
        <p data-testid="header-player-name">header</p>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

export default connect()(Header);
