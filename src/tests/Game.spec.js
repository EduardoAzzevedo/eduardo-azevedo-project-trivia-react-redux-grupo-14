import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página Game.',
() => {
  it('Testa se ao carregar a página a rota é "/game".',
  () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/game')
    expect(history.location.pathname).toBe('/game');
  })

  it('Testa header no game',
  () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/game')

  })

  it('Testa botão next está habilitado',
  () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/game')
    const wrongAnswer3 = screen.getByTestId('wrong-answer-2');
    userEvent.click(wrongAnswer3)
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument;
    userEvent.click(btnNext);
  })

  it('Testa perguntas', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/game')
  
    const questionText = screen.getByTestId('question-text');
    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-2');
  
    expect(questionText).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    expect(wrongAnswer1).toBeInTheDocument();
    expect(wrongAnswer2).toBeInTheDocument();
    expect(wrongAnswer3).toBeInTheDocument();
  })

})