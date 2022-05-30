import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rankingStorage, getRanking } from '../helpers/rankingStorage';

// Componentes
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.onSaveRanking();
  }

  onSaveRanking = () => {
    const { player } = this.props;
    const ranking = getRanking();
    const user = {
      id: ranking === null ? 0 : ranking.length,
      name: player.name,
      score: player.score,
      image: player.gravatarImage,
    };
    rankingStorage(user);
  }

  render() {
    const { player, history } = this.props;
    const NUM_3 = 3;
    return (
      <section>
        <Header />
        <h2> Feedback </h2>
        <div data-testid="feedback-text">
          {
            player.assertions < NUM_3 ? 'Could be better...' : 'Well Done!'
          }
          <div>
            Your final score:
            {' '}
            <div data-testid="feedback-total-score">{player.score}</div>
            Number of correct questions:
            {' '}
            <div data-testid="feedback-total-question">{player.assertions}</div>
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
  player: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
