import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Loading, Pagination, Error } from '../../components';
import useCharacters from './useCharacters';
import './characters.style.scss';

const Characters: FC = () => {
    const { isLoading,
            isError,
            data,
            nextHandler,
            prevHandler,
            page,
            refetchCharacters,
            error,
    } = useCharacters();
    if (isLoading) {
        return (
            <div className='characters__loading absolute absolute__center'>
                <Loading/>
            </div>
            )
    }
        
    if (isError) {
        return (
            <div className='characters__loading absolute absolute__center'>
                <Error
                    refetch={refetchCharacters}
                    msg={ error?.data?.error }
                />
            </div>
          )
    }

    return (
        <>
            <div className='characters__pagination flex flex__right'>
                <Pagination
                    nextHandler={nextHandler}
                    prevHandler={prevHandler}
                    currentPage={page}
                    pagesCount={data?.info?.pages}
                />
            </div>
            <section className='characters__container' data-testid="chars">
                {data?.results?.map((character, index) => (
                    <div
                        key={character.id}
                        className='character__container'
                        style={{
                            animationDelay: `${100 * index}ms`
                        }}
                    >
                        <Avatar name={character.name} url={character.image}/>
                        <h2 className='character__name'>
                            <Link to={`characters/${character.id}`}>
                                {character.name}
                            </Link>
                        </h2>
                    </div>
                    ))
                }
            </section>
    </>
    )
}

export default Characters;
