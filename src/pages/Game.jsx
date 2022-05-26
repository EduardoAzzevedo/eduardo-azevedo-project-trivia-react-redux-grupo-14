import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getToken, setToken } from '../helpers';

// Componentes
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
      answers: [],
    };
  }

  componentDidMount = () => {
    this.onFetchQuestion();
  }

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

  onGetAnswer = () => {
    const { questions, index } = this.state;
    const {
      incorrect_answers: incorrectAnswers, correct_answer: correctAnswer,
    } = questions[index];

    const answers = [
      { value: correctAnswer, correct: true },
      ...incorrectAnswers.map((answer, id) => ({ value: answer, id, correct: false })),
    ];

    const correctionFactor = 0.5;
    answers.sort(() => Math.random() - correctionFactor);
    this.setState({ answers });
  }

  onFetchQuestion = async () => {
    const { history } = this.props;
    const numberMagic = 3;
    const token = getToken();
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code === numberMagic) {
      setToken('');
      history.push('/');
    } else {
      this.setState({ questions: data.results }, () => this.onGetAnswer());
    }
  }

  onRenderQuestion = () => {
    const { questions, index, answers } = this.state;
    if (questions.length > 0) {
      return (<Question question={ questions[index] } answers={ answers } />);
    }
    return (<h2>Loaging</h2>);
  }

  render() {
    // console.log(category.category);
    return (
      <div>
        <Header />
        { this.onRenderQuestion() }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default Game;
