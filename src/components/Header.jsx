import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount = () => {
    const { player } = this.props;
    const { gravatarEmail } = player;
    const cryptoEmail = md5(gravatarEmail).toString();
    this.setState({
      gravatar: cryptoEmail,
    });
  }

  render() {
    const { gravatar } = this.state;
    const { player } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="Avatar do Gravatar"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <span data-testid="header-score">{ player.score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect(mapStateToProps)(Header);
