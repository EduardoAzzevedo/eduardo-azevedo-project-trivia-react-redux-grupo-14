import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionMult extends Component {
  render() {
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
            >
              {option.value}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

QuestionMult.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape),
  answers: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(QuestionMult);
