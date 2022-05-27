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
      timeOut: 30,
      disabled: false,
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

  componentDidMount = () => {
    const ONE_SECOND = 1000;
    const timeInt = setInterval(() => {
      const { disabled } = this.state;
      if (disabled) {
        clearInterval(timeInt);
      }
      this.setState((prevState) => ({
        timeOut: prevState.timeOut - 1,
      }), () => {
        const { timeOut } = this.state;
        if (timeOut === 0 || disabled) {
          clearInterval(timeInt);
          this.onHandleClick();
        }
      });
    }, ONE_SECOND);
  }

  onHandleClick = (e) => {
    const { timeOut } = this.state;
    const { question, dispatch } = this.props;
    this.setState((prevS) => ({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
      disabled: true,
      timeOut: prevS.timeOut,
    }));
    if (e !== undefined) {
      const option = e.target.innerHTML;
      if (question.correct_answer === option) {
        this.onCalculateScore(timeOut);
        dispatch(actions.changeAssertions());
      }
    }
    dispatch(actions.nextTrue());
  };

  render() {
    const { wrongAnswer, correctAnswer, timeOut, disabled } = this.state;
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
              onClick={ (e) => this.onHandleClick(e) }
              disabled={ disabled }
            >
              {option.value}
            </button>
          ))}
        </div>
        <div className="time">
          {timeOut}
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
