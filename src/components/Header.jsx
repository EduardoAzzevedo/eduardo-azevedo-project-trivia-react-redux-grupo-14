import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" src="" alt="" />
        <p data-testid="header-player-name">não sei</p>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

export default Header;
