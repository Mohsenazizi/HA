import request from './request';
import { CharactersType, Error } from '../types';

export const getCharacters = (page: string) => (
  request.get<CharactersType>(`/character`, { page })
    .then((response) => {
      if (response.status === 404) {
          return Promise.reject(response?.data)
      }
      return response.data;
    })
)