import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import * as helpers from '../helpers/tokenStorage'
import fetchTokenAPI from '../helpers/fetchAPI';

describe('Testa a página de Login', () => {
  const response = {
    "response_code":0,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
  }

  it('Testa se ao carregar a página a rota é "/".', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  })

  it('Testa se os inputs de name e de email estão na página.', () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })

  it('Testa se o botão de começar e settings do jogo está na página.', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByTestId('btn-play');
    const settings = screen.getByTestId('btn-settings')

    expect(button).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
  })

  it('teste o botão settings', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const settings = screen.getByTestId('btn-settings')
    userEvent.click(settings)

    expect(history.location.pathname).toBe('/settings')
    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  })

  it('Testa se o botão está desabilitado ao carregar a página com os inputs vazios.', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByTestId('btn-play');

    expect(button).toBeDisabled();
  })

  it('Testa se o botão habilita ao preencher os inputs.', () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');

    userEvent.type(name, 'sdas');
    userEvent.type(email, 'teste@test.com');

    expect(button).toBeEnabled();
  })

  it('Testa o armazenamento da Store', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');

    userEvent.type(name, 'sdasasasd asdasda');
    userEvent.type(email, 'teste@test.com');
    userEvent.click(button);

    const { player } = store.getState();
    expect(player.name).toBe('sdasasasd asdasda');
    expect(player.gravatarEmail).toBe('teste@test.com');
  });

  it('Testa o armazenamento do localStorage', () => {
    renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');

    userEvent.type(name, 'sdasasasd asdasda');
    userEvent.type(email, 'teste@test.com');
    userEvent.click(button);

    expect(localStorage.length).toBe(0);

  });

  it('Testa a chamada do da API do Token', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    fetchTokenAPI();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Testa o armazenamento do token', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    fetchTokenAPI();
    expect(helpers.getToken()).toBe('f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6');
  })
});
