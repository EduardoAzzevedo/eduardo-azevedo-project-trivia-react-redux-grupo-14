import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style/Question.css';

// Actions
import * as actions from '../redux/actions/index';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      wrongAnswer: '',
      correctAnswer: '',
    };
  }

  onCalculateScore = (timeout) => {
    const { question, dispatch } = this.props;
    const { difficulty } = question;
    const hardValue = 3;
    const constNumber = 10;
    const mediumOrEasy = difficulty === 'medium' ? 2 : 1;
    const diffPoint = difficulty === 'hard' ? hardValue : mediumOrEasy;
    const score = constNumber + (timeout * diffPoint);
    dispatch(actions.changeScore(score));
  }

  onHandleClick = () => {
    this.setState({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
    });
  };

  render() {
    const { wrongAnswer, correctAnswer } = this.state;
    const { question, answers } = this.props;
    return (
      <section>
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <p data-testid="question-text">{question.question}</p>
        </div>
        <div data-testid="answer-options">
          {answers.map((option, index) => (
            <button
              key={ index }
              type="button"
              data-testid={
                option.correct ? 'correct-answer' : `wrong-answer-${option.id}`
              }
              id={ option.correct ? 'correct' : 'wrong' }
              className={ option.correct ? correctAnswer : wrongAnswer }
              onClick={ this.onHandleClick }
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
}.isRequired;

export default connect()(Question);
