import { useState, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { ResponseResultType } from '../../helpers';
import { getCharacters } from '../../services';
import { CharactersType, Error } from '../../types';

const useCharacters = () => {
  const [page, setPage] = useState<number>(1);
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('page')) {
        setPage(parseInt(params.get('page')!))
    }
  }, []);

  useEffect(() => {
    if (page !== 1) {
      history.push({
        search:`?page=${page}`
      })     
    } else {
      history.push({
        search: ''
      }) 
    }
  }, [page])
  
  const getCharactersQueryFn = useCallback((page): (Promise <ResponseResultType<CharactersType>>) => {

    return getCharacters(page.toString())
  }, []);

  const {
    isLoading,
    isError,
    data,
    refetch: refetchCharacters,
    error,
  } = useQuery<Promise<ResponseResultType<CharactersType>>, Error, CharactersType, (string | number)[]>(
      ['characters', page],
      () => getCharactersQueryFn(page),
      { retry: false },
    );

  const nextHandler = useCallback(() => {
    if (!data?.info?.next) {
      return;
    }
  
    setPage((currentPage) => currentPage + 1)
  }, [data])

  const prevHandler = useCallback(() => {
    if (!data?.info?.prev) {
      return;
    }
    setPage((currentPage) => currentPage - 1)
  }, [data])

  return {
    page,
    data,
    error,
    isError,
    setPage,
    isLoading,
    nextHandler,
    prevHandler,
    refetchCharacters

  }
}
export default useCharacters;
