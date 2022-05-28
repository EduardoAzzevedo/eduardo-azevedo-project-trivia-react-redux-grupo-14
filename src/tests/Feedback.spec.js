import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de feedbacks',
  () => {
    it('Testa se ao carregar a página a rota é "/feedback".',
    () => {
      const { history } = renderWithRouterAndRedux(<App />);

      history.push('/feedback');

      expect(history.location.pathname).toBe('/feedback');
    })
    it('Testa se ao clicar no botão play again é redirecionado para a página de login',
    () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');

      const buttonPlayAgain = screen.getByTestId('btn-play-again');
      expect(buttonPlayAgain).toBeInTheDocument();

      userEvent.click(buttonPlayAgain);
      expect(history.location.pathname).toBe('/');
    })
    it('Testa se ao clicar no botão ranking é redirecionado para a página de ranking',
    () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');

      const buttonRanking = screen.getByTestId('btn-ranking');
      expect(buttonRanking).toBeInTheDocument();

      userEvent.click(buttonRanking);
      expect(history.location.pathname).toBe('/ranking');
    })
})