import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRanking } from '../helpers/rankingStorage';
import triviaImg from '../imagens/trivia.png';
import './style/Ranking.css';

class Ranking extends React.Component {
  render() {
    console.log(getRanking());
    const { history } = this.props;
    return (
      <>
        <header>
          <img className="trivia-img" src={ triviaImg } alt="trivia" />
          <div className="title">
            <h2 data-testid="ranking-title">Ranking</h2>
          </div>
        </header>
        <main>
          <button
            className="back-button"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Go home
          </button>
          <section className="ranking-container">
            { getRanking().sort((a, b) => b.score - a.score).map((user, index) => (
              <div key={ index }>
                <img src={ user.image } alt="gravatar_image" />
                <div className="player-name">
                  <h2 data-testid={ `player-name-${user.id}` }>{ user.name }</h2>
                </div>
                <h2 data-testid={ `player-score-${user.id}` }>{ user.score }</h2>
              </div>
            ))}
          </section>
        </main>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(Ranking);
