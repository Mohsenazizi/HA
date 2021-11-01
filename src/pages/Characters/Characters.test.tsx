//@ts-nocheck
import { render, cleanup, findByTestId, findByText } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useHistory } from 'react-router-dom';
import Characters from './Characters';
import { getCharacters } from '../../services';

jest.mock('../../services', () => ({
  getCharacters: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
  Link: ({ children }) => children,
}))

describe('Characters', () => {
  jest.spyOn(console, 'error');

  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const renderCharacters = () => render(
    <Characters />,
    { wrapper }
  );

  beforeEach(() => {
    useHistory.mockImplementation(() => ({ push: jest.fn() }));
  });

  afterEach(cleanup);
  
  it('should render loading icon', () => {
    const { container } = renderCharacters();
    
    expect(container.querySelector('.loading')).toBeVisible();
  });
  
  it('should render error component', async () => {
    const error = 'something happened';
    getCharacters.mockRejectedValue({ data: { error } });

    const { container } = renderCharacters();
    const node = await findByText(container, error);

    expect(node).toBeInTheDocument();
  });

  it('should try to fetch data from backend', async () => {
    const historyPush = jest.fn();
    useHistory.mockImplementationOnce(() => ({
      push: historyPush,
    }))

    renderCharacters();

    expect(historyPush).toHaveBeenCalledWith({ search: '' });
    expect(getCharacters).toHaveBeenCalledTimes(1);
  });

  it('should rendered correctly', async () => {
    const mockedData = {
      info: {
        count: 1,
        next: "",
        pages: 2,
        prev: null,
      },
      results: [
        {
          id: 1,
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          name: "Morty Smith",
        },
        {
          id: 2,
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          name: "Rick Sanchez",
        }
      ]
    };

    getCharacters.mockResolvedValue(mockedData);
    const { container } = renderCharacters();

    const node = await findByTestId(container, 'chars');
    const chars = node.querySelectorAll('.character__container');

    expect(chars).toHaveLength(2);
    expect(chars[0].textContent).toBe(mockedData.results[0].name);
    expect(chars[1].textContent).toBe(mockedData.results[1].name);
  })
});
