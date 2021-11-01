import { useQuery } from 'react-query';
import { ResponseResultType } from '../../helpers';
import { getEpisode } from '../../services';
import { EpisodeType, Error } from '../../types';

const useEpisode = (url: string) => {

  const { isLoading, isError, data, refetch: refetchEpisode, error } = useQuery<Promise<ResponseResultType<EpisodeType>>, Error, EpisodeType, (string | number)[]>(['episode', url], ()=> getEpisode(url), {
    retry: false
  });

  return {
    data,
    error,
    isError,
    isLoading,
    refetchEpisode,
  }
}

export default useEpisode;
