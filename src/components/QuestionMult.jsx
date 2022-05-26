import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionMult extends Component {
  render() {
    const { question } = this.props;
    const incorrectAnswers = question.incorrect_answers;
    const correctAnswer = question.correct_answer;
    const options = [...incorrectAnswers, correctAnswer];
    return (
      <section>
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <p data-testid="question-text">{question.question}</p>
        </div>
        <div data-testid="answer-options">
          {options.map((option, index) => (
            <button
              key={ index }
              type="button"
              data-testid={
                correctAnswer === option ? 'correct-answer' : `wrong-answer-${index}`
              }
            >
              {option}
            </button>
          ))}
          ;
        </div>
      </section>
    );
  }
}

QuestionMult.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(QuestionMult);
