import { Request } from '../helpers';
import { EpisodeType } from '../types';

export const getEpisode = (url: string) => {
  const request = new Request(url);

  return request.get<EpisodeType>()
    .then((response) => {
      if (response.status === 404) {
          Promise.reject(response.data)
      }
     return response.data;
    })
}