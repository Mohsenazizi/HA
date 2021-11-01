import request from './request';
import { CharactersType } from '../types';

export const getCharacters = (page: string) => (
  request.get<CharactersType>(`/character`, { page })
    .then((response) => {
      if (response.status >= 400) {
          return Promise.reject(response?.data)
      }
      return response.data;
    })
)