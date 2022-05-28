import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Componentes
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const NUM_3 = 3;
    return (
      <section>
        <Header />
        <h2> Página: Feedback </h2>
        <span data-testid="feedback-text">
          {
            assertions < NUM_3 ? 'Could be better...' : 'Well Done!'
          }
        </span>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
