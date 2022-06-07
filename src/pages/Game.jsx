import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getToken, setToken } from '../helpers';
import Question from '../components/Question';
import * as actions from '../redux/actions';
import './style/Game.css';

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
  }

  onSetTimeOut = () => {
    this.setState({
      timeOut: 30,
      disabled: false,
      wrongAnswer: 'time-ok-answer',
      correctAnswer: 'time-ok-answer',
    });

    const ONE_SECOND = 1000;
    const timeInt = setInterval(() => {
      const { disabled, timeOut } = this.state;
      if (disabled) {
        clearInterval(timeInt);
      } else {
        this.setState((prevState) => ({
          timeOut: prevState.timeOut - 1,
        }), () => {
          if (timeOut === 1 || disabled) {
            clearInterval(timeInt);
            this.onHandleClick();
          }
        });
      }
    }, ONE_SECOND);
  }

  onGetAnswer = () => {
    const { questions, index } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
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
    const errorReturnAPI = 3;
    const token = getToken();
    const url = this.onGeneratorURL(token);
    const response = await fetch(url);
    const data = await response.json();
    if (data.response_code === errorReturnAPI) {
      setToken('');
      history.push('/');
    } else {
      this.setState({ questions: data.results }, () => this.onGetAnswer());
      this.onSetTimeOut();
    }
  }

  onRenderQuestion = () => {
    const {
      questions, index, answers, wrongAnswer, correctAnswer, disabled,
    } = this.state;

    if (questions.length > 0) {
      return (
        <Question
          question={ questions[index] }
          answers={ answers }
          wrongAnswer={ wrongAnswer }
          correctAnswer={ correctAnswer }
          disabled={ disabled }
          onClickQuestion={ this.onClickQuestion }
          onHandleClick={ this.onHandleClick }
        />
      );
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

  onHandleClick = (event) => {
    const { questions, timeOut, index } = this.state;
    const { dispatch } = this.props;

    this.setState((prevS) => ({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
      disabled: true,
      timeOut: prevS.timeOut,
    }));

    if (event !== undefined) {
      const option = event.target.innerHTML;
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
    const timeFinish = 10;
    return (
      <>
        <Header />
        <main>
          <div
            data-testid="timer"
            className={ timeOut > timeFinish ? 'time-on' : 'time-finish' }
          >
            {timeOut}
          </div>
          { this.onRenderQuestion() }
          {isNext && (
            <button
              className="next-button"
              type="button"
              data-testid="btn-next"
              onClick={ this.onChangeIndex }
            >
              Next
            </button>
          )}
        </main>
      </>
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
