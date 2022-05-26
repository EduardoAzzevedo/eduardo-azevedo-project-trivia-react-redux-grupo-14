import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getToken, setToken } from '../helpers';
import QuestionBool from '../components/QuestionBool';
import QuestionMult from '../components/QuestionMult';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
      index: 0,
    };
  }

  componentDidMount = () => {
    this.onFetchQuestion();
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
      this.setState({ question: data.results });
    }
  }

  onRenderQuestion = () => {
    const { question, index } = this.state;
    if (question.length > 0) {
      const { type } = question[index];
      if (type === 'boolean') return (<QuestionBool question={ question[index] } />);
      return (<QuestionMult question={ question[index] } />);
    }
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
