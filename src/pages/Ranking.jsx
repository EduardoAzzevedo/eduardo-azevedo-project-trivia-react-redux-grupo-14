import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRanking } from '../helpers/rankingStorage';

class Ranking extends React.Component {
  render() {
    console.log(getRanking());
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go home
        </button>
        { getRanking().sort((a, b) => b.score - a.score).map((user, index) => (
          <div key={ index }>
            <img src={ user.image } alt="gravatar_image" />
            <h2 data-testid={ `player-name-${user.id}` }>{ user.name }</h2>
            <h2 data-testid={ `player-score-${user.id}` }>{ user.score }</h2>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(Ranking);
