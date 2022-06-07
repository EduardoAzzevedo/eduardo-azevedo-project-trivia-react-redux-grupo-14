import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Settings from '../pages/Settings';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a pagina de Settings', () => {
  it('Testa se ao clicar no botão Settings a página é direcionada para a rota "/settings".', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settings = screen.getByTestId('btn-settings');
    userEvent.click(settings);

    expect(history.location.pathname).toBe('/settings');
  })

  it('Testa se o botão de voltar para a home está na página.', () => {
    renderWithRouterAndRedux(<Settings />);

    const backButton = screen.getByRole('button', { name: 'Go Home' });
    expect(backButton).toBeInTheDocument();
  })

  it('Testa se ao clicar no botão de voltar para a home a página é direcionada para a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/settings');

    const backButton = screen.getByRole('button', { name: 'Go Home' });
    userEvent.click(backButton);

    expect(history.location.pathname).toBe('/');
  })

  it('Testa se as opções de configuração estão disponíveis', async () => {
    renderWithRouterAndRedux(<Settings />);

    const settings = await screen.findByLabelText('Category:');
    expect(settings).toBeInTheDocument();

    const difficulty = await screen.findByLabelText('Difficulty:');
    expect(difficulty).toBeInTheDocument();

    const type = await screen.findByLabelText('Type:');
    expect(type).toBeInTheDocument();
  })

  it('Testa se o estado é alterado quando é selecionado uma comfiguração.', async () => {
    const { store } = renderWithRouterAndRedux(<Settings />);

    const categoryInput = await screen.findByRole('combobox', { name: 'Category:' });
    userEvent.selectOptions(categoryInput, '9');
    expect(store.getState().settings.category).toBe('9');

    const difficultyInput = await screen.findByRole('combobox', { name: 'Difficulty:' });
    userEvent.selectOptions(difficultyInput, 'easy');
    expect(store.getState().settings.difficulty).toBe('easy');

    const typeInput = await screen.findByRole('combobox', { name: 'Type:' });
    userEvent.selectOptions(typeInput, 'multiple');
    expect(store.getState().settings.type).toBe('multiple');
  })
})
