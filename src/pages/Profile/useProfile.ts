import { useQuery } from 'react-query';
import { ResponseResultType } from '../../helpers';
import { getCharacter } from '../../services';
import { CharacterType, Error} from '../../types';
const useProfile = (id: string) => {
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

export default useProfile;
