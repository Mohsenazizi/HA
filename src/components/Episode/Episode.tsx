import { FC, useCallback } from 'react';
import { GrFormRefresh } from 'react-icons/gr';
import { BsCheckLg } from 'react-icons/bs';
import { Button, Loading } from '../../components';
import useEpisode from "./useEpisode";
import './episode.style.scss';

 interface EpisodeProps  {
   url: string;
}
const Episode: FC<EpisodeProps> = ({ url }) => {
  const { data, isLoading, isError, refetchEpisode, error } = useEpisode(url);
  const onRefetchClick = useCallback(() => {
    refetchEpisode();
  }, [refetchEpisode]);

  return (
    <div className='episode__container flex flex__v-center full__width'>
      {
        isLoading ? (<Loading /> ) :
          isError ? (
            <Button
              square={true}
              onClick={onRefetchClick}>
              <GrFormRefresh />
             { error?.data?.error && 'Some Thing Went Wrong...' }
            </Button>) : (
              <>
            <div>
            <BsCheckLg/>
              <span>
                {data?.name}
              </span>
            </div>
              <span>
                {data?.episode}
              </span>
            </>
          )
      }
    </div>
  )
}

export default Episode;