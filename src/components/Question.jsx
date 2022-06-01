import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
// import * as actions from '../redux/actions/index';

class Question extends Component {
  render() {
    const {
      question, answers, wrongAnswer, correctAnswer, disabled, onHandleClick,
    } = this.props;
    return (
      <section>
        <div className="question">
          <div>
            <h2 data-testid="question-category">{question.category}</h2>
          </div>
          <div>
            <p data-testid="question-text">{question.question}</p>
          </div>
        </div>
        <div className="answers" data-testid="answer-options">
          {answers.map((option, index) => (
            <button
              key={ index }
              type="button"
              data-testid={
                option.correct ? 'correct-answer' : `wrong-answer-${option.id}`
              }
              id={ option.correct ? 'correct' : 'wrong' }
              className={ option.correct ? correctAnswer : wrongAnswer }
              onClick={ onHandleClick }
              disabled={ disabled }
            >
              {option.value}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape),
  answers: PropTypes.objectOf(PropTypes.shape),
  isNext: PropTypes.bool,
  onClickQuestion: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  isNext: state.game.isNext,
});

export default connect(mapStateToProps)(Question);
