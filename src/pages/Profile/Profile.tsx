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
            <div className='profile__loading absolute absolute__center'>
                <Loading/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='absolute absolute__center'>
                <Error
                    refetch={refetchProfile}
                    msg={error?.data?.error}
                />
            </div>
        )
    }

    return (
        <section className='profile__container flex flex__vertical'>
            <div className='flex flex__v-center flex__vertical full__width'>
                <div className='profile__avatar flex flex__vertical flex__v-center'>
                <Avatar url={data?.image!} name={data?.name!} />
                </div>
                <h2 className='profile__title'>
                    {data?.name}
                </h2>
            </div>
                <ul className='profile__details flex'>
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
            <div className='episodes__container flex flex__h-center flex__vertical full__width'>
                <h2>
                    Episodes:
                </h2>
                <ul className='episodes__items full__width flex'>
                    {data?.episode?.map((url, index) => (
                        <li
                            key={url}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <Episode url={url} />
                       </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Profile;
