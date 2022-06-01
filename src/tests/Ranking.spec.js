import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página Ranking.',
() => {
  it('Testa se ao carregar a página a rota é "/ranking".',
  () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/ranking')
    expect(history.location.pathname).toBe('/ranking');
  })
  it('Testa se ao clicar no botão "Go home" é redirecionado para a página de login',
  () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btnGoHome = screen.getByTestId('btn-go-home');
    expect(btnGoHome).toBeInTheDocument();

    userEvent.click(btnGoHome);
    expect(history.location.pathname).toBe('/');
  })
})