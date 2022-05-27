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
    };
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
