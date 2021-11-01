//@ts-nocheck
import React from 'react';
import { render, screen, findByText, shallow } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useHistory } from 'react-router-dom';
import Characters from './Characters';
import { getCharacters } from '../../services';
import {BrowserRouter, Link } from 'react-router-dom'

jest.mock('../../services', () => ({
  getCharacters: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}))
// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('Characters', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
  );

  const renderCharacters = () => render(
    <Characters />, { wrapper });
  
  // it('should render loading icon', () => {
  //   useHistory.mockImplementationOnce(() => ({
  //     push: jest.fn(),
  //   }))
  //   const { container } = renderCharacters();
    
  //   expect(container.querySelector('.loading')).toBeVisible();
  // });
  
  // it('should render error component', async () => {
  //   useHistory.mockImplementationOnce(() => ({
  //     push: jest.fn(),
  //   }))
  //   const error = 'something happened';
  //   getCharacters.mockReturnValue(Promise.reject({ data: {error}}));
  //   const { container } = renderCharacters();
  //   const node = await findByText(container, error);

  //   expect(node).toBeTruthy();
  // });

  it('should try to fetch data from backend', async () => {
    const historyPush = jest.fn();
    useHistory.mockImplementationOnce(() => ({
      push: historyPush,
    }))

    const mockedData = {
        info: {
          count: 1,
          next: "",
          pages: 2,
          prev: null,
        },
        results: [
          {
            gender: "Male",
            id: 1,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            location: {
              name: "Earth (Replacement Dimension)",
              url: "https://rickandmortyapi.com/api/location/20"
            },
            name: "Rick Sanchez",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1"
            },
            species: "Human",
            status: "Alive",
            type: "",
            url: "https://rickandmortyapi.com/api/character/1",
          },
          {
            gender: "Male",
            id: 2,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            location: {
              name: "Earth (Replacement Dimension)",
              url: "https://rickandmortyapi.com/api/location/20"
            },
            name: "Rick Sanchez",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1"
            },
            species: "Human",
            status: "Alive",
            type: "",
            url: "https://rickandmortyapi.com/api/character/1",
          }
        ]
    }

    getCharacters.mockReturnValue(Promise.resolve(mockedData));
    const { container } = renderCharacters();
    expect(historyPush).toHaveBeenCalledWith({ search: '' });
    expect(getCharacters).toHaveBeenCalledTimes(1);
    // screen.debug();
    
    const node = await findByTestId(container, 'char');
    expect(node).toBeTruthy();
  });
});
