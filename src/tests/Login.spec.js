import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Login',
() => {
  it('Testa se ao carregar a página a rota é "/".',
  () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  })

  it('Testa se os inputs de name e de email estão na página.',
  () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })

  it('Testa se o botão de começar e settings do jogo está na página.',
  () => {
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

  it('Testa se o botão está desabilitado ao carregar a página com os inputs vazios.',
  () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByTestId('btn-play');

    expect(button).toBeDisabled();
  })

  it('Testa se o botão habilita ao preencher os inputs.',
  () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');

    userEvent.type(name, 'sdas');
    userEvent.type(email, 'teste@test.com');

    expect(button).toBeEnabled();
  })
});
