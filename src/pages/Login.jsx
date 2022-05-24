import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.onHandleCheck());
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

    return (
      <form>
        <label htmlFor="name">
          Name:
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

        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
