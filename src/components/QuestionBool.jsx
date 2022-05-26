import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionBool extends Component {
  moveArrayElement = (arr, from, to) => {
    const el = arr[from];
    arr.splice(from, 1);
    arr.splice(to, 0, el);
  };

 drawOptions = (array) => {
   const arraySize = array.length - 1;
   array.forEach((el, index) => {
     const indice = Math.floor(Math.random() * arraySize);
     this.moveArrayElement(array, index, indice);
   });
   return array;
 }

 render() {
   const { question } = this.props;
   const incorrectAnswers = question.incorrect_answers;
   const correctAnswer = question.correct_answer;
   const options = this.drawOptions([...incorrectAnswers, correctAnswer]);
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
               correctAnswer === option ? 'correct-answer' : `wrong-answer-${
                 incorrectAnswers.indexOf(option)}`
             }
           >
             {option}
           </button>
         ))}
       </div>
     </section>
   );
 }
}

QuestionBool.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(QuestionBool);
