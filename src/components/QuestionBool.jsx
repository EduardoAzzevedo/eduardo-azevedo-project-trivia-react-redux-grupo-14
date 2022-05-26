import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionBool extends Component {
  render() {
    const { question } = this.props;
    return (
      <section>
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <p data-testid="question-text">{question.question}</p>
        </div>
        <div data-testid="answer-options">
          <button
            type="button"
            data-testid={
              question.correct_answer === 'True' ? 'correct-answer' : 'wrong-answer'
            }
          >
            True
          </button>
          <button
            type="button"
            data-testid={
              question.correct_answer === 'False' ? 'correct-answer' : 'wrong-answer'
            }
          >
            False
          </button>
        </div>
      </section>
    );
  }
}

QuestionBool.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(QuestionBool);
