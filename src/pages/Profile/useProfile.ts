import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { ResponseResultType } from '../../helpers';
import { getCharacter } from '../../services';
import { CharacterType, Error} from '../../types';

const useCharacter = (id: string) => {

  const { isLoading, isError, data , error, refetch: refetchProfile } = useQuery<Promise<ResponseResultType<CharacterType>>, Error, CharacterType, (string | number)[]>(['character', id], ()=> getCharacter(id), {
    retry: false
  });
  
  return {
    data,
    error,
    isError,
    isLoading,
    refetchProfile,
  }
}

export default useCharacter;
