import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Componentes
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    console.log(history);
    const NUM_3 = 3;
    return (
      <section>
        <Header />
        <h2> Feedback </h2>
        <div data-testid="feedback-text">
          {
            assertions < NUM_3 ? 'Could be better...' : 'Well Done!'
          }
          <div>
            Your final score:
            {' '}
            <div data-testid="feedback-total-score">{score}</div>
            Number of correct questions:
            {' '}
            <div data-testid="feedback-total-question">{assertions}</div>
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('./') }
        >
          Play again
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
