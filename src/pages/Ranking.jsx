import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h2 data-testid="ranking-title"> Hello world </h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('./') }
        >
          Go home
        </button>

      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(Ranking);
