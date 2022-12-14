import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import apiInvalida from './helpers/apiInvalidaMokada';
import apiMokada from './helpers/apiMokada';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página Game', () => {
  const INITIAL_STATE = {
    player: {
    name: 'playerInicial',
    assertions: 0,
    score: 0,
    gravatarEmail: 'test@test.com',
    correctAnswers: 0,
    }
  }
  
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(apiMokada)})
  });
  
  afterEach(() => {
    jest.useRealTimers();
  })

  it('Testa se ao carregar a página a rota é "/game".', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/game')

    expect(history.location.pathname).toBe('/game');
  })

  it('Testa timer do componente Game- iniciando o timer', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const timer = await screen.findByTestId('timer');

    expect(timer.innerHTML).toBe('30');
  })

  it('Testa timer do componente Game- timer inicial menos 30s', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const timer = await screen.findByTestId('timer');
    expect(timer.innerHTML).toBe('30');

    jest.advanceTimersByTime(30000);
    expect(timer.innerHTML).toBe('0');
  })

  it('Testa se responde as 5 perguntas e direcionar para feedback.', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game')

    for (let i = 0; i < 5; i+= 1) {
      await waitFor(() => {
        const correctAnswer = screen.getByTestId('correct-answer');
        expect(correctAnswer).toBeInTheDocument()
        userEvent.click(correctAnswer);
        const btnNext = screen.getByTestId('btn-next');
        expect(btnNext).toBeInTheDocument();
        userEvent.click(btnNext)
      });
    }

    expect(history.location.pathname).toBe('/feedback');
  });

  it('Testa se ao zerar o timer exibe o botão "Next".', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game')

    await screen.findByTestId('timer');
    jest.advanceTimersByTime(30000);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
  })

  it('Testa carregamento com token invalido.', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json:jest.fn().mockResolvedValue(apiInvalida)
    });
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game')
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    })
  })
})
