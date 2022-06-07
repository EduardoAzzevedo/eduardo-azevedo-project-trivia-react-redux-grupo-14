import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userRanking from '../tests/helpers/mockRanking';

describe('Testa a página Ranking.', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(userRanking));
  });

  afterEach(() => localStorage.clear());

  it('Testa se ao carregar a página a rota é "/ranking".', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/ranking')
    expect(history.location.pathname).toBe('/ranking');
  })

  it('Testa se ao clicar no botão "Go home" é redirecionado para a página de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btnGoHome = screen.getByTestId('btn-go-home');
    expect(btnGoHome).toBeInTheDocument();

    userEvent.click(btnGoHome);
    expect(history.location.pathname).toBe('/');
  })

  it('Testa se os player que estão salvos no localStore são renderizados na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const player1 = screen.getByTestId('player-name-0');
    const score1 = screen.getByTestId('player-score-0');
    expect(player1).toBeInTheDocument();
    expect(score1).toBeInTheDocument();
    expect(player1.textContent).toBe('player1');
    expect(score1.textContent).toBe('10');

    const player2 = screen.getByTestId('player-name-1');
    const score2 = screen.getByTestId('player-score-1');
    expect(player2).toBeInTheDocument();
    expect(score2).toBeInTheDocument();
    expect(player2.textContent).toBe('player2');
    expect(score2.textContent).toBe('20');
  })
})
