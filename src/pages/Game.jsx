import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getToken, setToken } from '../helpers';

// Componentes
import Question from '../components/Question';

// Actions
import * as actions from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
      answers: [],
      wrongAnswer: '',
      correctAnswer: '',
      timeOut: 0,
      disabled: false,
    };
  }

  componentDidMount = () => {
    this.onFetchQuestion();
    this.onSetTimeOut();
  }

  onSetTimeOut = () => {
    this.setState({
      timeOut: 30,
      disabled: false,
      wrongAnswer: '',
      correctAnswer: '',
    });

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

  onGeneratorURL = (token) => {
    const { settings } = this.props;
    const { category, difficulty, type } = settings;
    const defaultURL = 'https://opentdb.com/api.php?amount=5';
    const categories = category !== '' ? `&category=${category}` : '';
    const difficulties = difficulty !== '' ? `&difficulty=${difficulty}` : '';
    const types = type !== '' ? `&type=${type}` : '';
    const url = `${defaultURL}${categories}${difficulties}${types}&token=${token}`;
    return url;
  }

  onFetchQuestion = async () => {
    const { history } = this.props;
    const numberMagic = 3;
    const token = getToken();
    const url = this.onGeneratorURL(token);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.response_code === numberMagic) {
      setToken('');
      history.push('/');
    } else {
      this.setState({ questions: data.results }, () => this.onGetAnswer());
    }
  }

  onRenderQuestion = () => {
    const {
      questions, index, answers, wrongAnswer, correctAnswer, disabled,
    } = this.state;
    if (questions.length > 0) {
      return (<Question
        question={ questions[index] }
        answers={ answers }
        wrongAnswer={ wrongAnswer }
        correctAnswer={ correctAnswer }
        disabled={ disabled }
        onClickQuestion={ this.onClickQuestion }
        onHandleClick={ this.onHandleClick }
      />);
    }
    return (<h2>Loading</h2>);
  }

  onChangeIndex = () => {
    const { index, questions } = this.state;
    const { history, dispatch } = this.props;
    if (index < questions.length - 1) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }), () => {
        this.onGetAnswer();
        dispatch(actions.nextTrue(false));
        this.onSetTimeOut();
      });
    } else {
      history.push('/feedback');
    }
  }

  onCalculateScore = (timeout) => {
    const { questions, index } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = questions[index];
    const hardValue = 3;
    const constNumber = 10;
    const mediumOrEasy = difficulty === 'medium' ? 2 : 1;
    const diffPoint = difficulty === 'hard' ? hardValue : mediumOrEasy;
    const score = constNumber + (timeout * diffPoint);
    dispatch(actions.changeScore(score));
  }

  onHandleClick = (e) => {
    const { questions, timeOut, index } = this.state;
    const { dispatch } = this.props;
    this.setState((prevS) => ({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
      disabled: true,
      timeOut: prevS.timeOut,
    }));
    if (e !== undefined) {
      const option = e.target.innerHTML;
      if (questions[index].correct_answer === option) {
        this.onCalculateScore(timeOut);
        dispatch(actions.changeAssertions());
      }
    }
    dispatch(actions.nextTrue(true));
  };

  render() {
    const { timeOut } = this.state;
    const { isNext } = this.props;
    return (
      <div>
        <Header />
        <div
          data-testid="timer"
          className="time"
        >
          {timeOut}
        </div>
        { this.onRenderQuestion() }
        {isNext && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.onChangeIndex }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isNext: state.game.isNext,
  settings: state.settings,
});

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect(mapStateToProps)(Game);
