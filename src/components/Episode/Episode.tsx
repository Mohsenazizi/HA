import { FC } from 'react';
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
  return (
    <div className='episode--container flex flex--v-center full--width'>
      {
        isLoading ? (<Loading /> ) :
          isError ? (
            <Button
              square={true}
              onClick={() => refetchEpisode()}>
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