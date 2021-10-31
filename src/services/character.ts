import request from './request';
import { CharacterType } from '../types';

export const getCharacter = (id: string) => (
  request.get<CharacterType>(`/character/${id}`)
    .then((response) => {
      if (response.status === 404) {
        return Promise.reject(response?.data)
      }
      return response.data;
    })
)