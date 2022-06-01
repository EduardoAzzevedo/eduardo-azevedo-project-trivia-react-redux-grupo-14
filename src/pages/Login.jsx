import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import * as helpers from '../helpers';
import fetchTokenAPI from '../helpers/fetchAPI';
import triviaImg from '../imagens/trivia.png';
import './style/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(actions.resetPlayer());
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.onHandleCheck());
  }

  onGetToken = async () => {
    // Pegando o TOKEN
    // if (!helpers.getToken()) {
    const { history } = this.props;
    const token = await fetchTokenAPI();
    helpers.setToken(token);
    this.setState({}, () => history.push('/game'));
    // }
  }

  onHandleClick = () => {
    const { name, email } = this.state;
    const { dispatch } = this.props;
    dispatch(actions.changeUser({ name, email }));
    this.onGetToken();
  }

  onHandleCheck = () => {
    const { name, email } = this.state;
    const disabled = !name || !email;
    this.setState({
      disabled,
    });
  }

  render() {
    const { name, email, disabled } = this.state;
    const { history } = this.props;
    return (
      <div className="Login">
        <img src={ triviaImg } alt="trivia" />
        <form>
          <label htmlFor="name">
            Play Name:
            <input
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.onHandleChange }
              data-testid="input-player-name"
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onHandleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <div className="button_forms">
            <button
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ this.onHandleClick }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Settings
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect()(Login);
