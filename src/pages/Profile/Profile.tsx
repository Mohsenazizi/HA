import { FC } from "react";
import { useParams } from "react-router";
import { Avatar, Episode, Loading, Error } from '../../components';
import useCharacter from './useProfile';
import './profile.style.scss';
type paramsTypes = {
    id: string
}

const Profile: FC = () => {
    const { id }: paramsTypes = useParams();
    const { data, isLoading, isError, error, refetchProfile } = useCharacter(id);

    if (isLoading) {
        return (
            <div className='profile--loading absolute absolute--center'>
            <Loading/>
        </div>
        )
    }

    if (isError) {
        return (
            <div className='absolute absolute--center'>
                <Error
                    refetch={refetchProfile}
                    msg={error?.data?.error}
                />
        </div>
        )
    }

    return (
        <section className='profile--container flex flex--vertical'>
            <div className='flex flex--v-center flex--vertical full--width'>
                <div className='profile--avatar flex flex--vertical flex--v-center'>
                <Avatar url={data?.image!} name={data?.name!} />
                </div>
                <h2 className='profile--title'>
                    {data?.name}
                </h2>
            </div>
                <ul className='profile--details flex'>
                <li>
                    <span>
                        Status: 
                    </span>
                    {data?.status}
                </li>
                <li>
                    <span>
                        Gender: 
                    </span>
                    {data?.gender}
                </li>   
                <li>
                    <span>
                        SPECIES: 
                    </span>
                    {data?.species}
                </li>
                <li>
                    <span>
                        Location:
                    </span>
                    {data?.location?.name}
                </li>
                <li>
                    <span>
                        Origin:
                    </span>
                    {data?.origin?.name}
                </li> 
                </ul>
   
            <div className='episodes--container flex flex--h-center flex--vertical full--width'>
                <h2>
                    Episodes:
                </h2>
                <ul className='episodes--items full--width flex'>
                    {
                    data?.episode?.map((url: string, index: number) => (
                        <li
                            key={url}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                        <Episode url={url} />
                       </li>
                    ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default Profile;
