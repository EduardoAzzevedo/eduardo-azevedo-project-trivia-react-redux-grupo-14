import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style/Question.css';

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

  onHandleClick = () => {
    this.setState((prevS) => ({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
      disabled: true,
      timeOut: prevS.timeOut,
    }));
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
              className={ option.correct ? correctAnswer : wrongAnswer }
              onClick={ this.onHandleClick }
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
