import { FC } from 'react';
import { Link } from 'react-router-dom'
import { CharacterType } from '../../types/Character';
import { Avatar, Loading, Pagination, Error } from '../../components';
import useCharacters from './useCharacters';
import './characters.style.scss';

const Characters: FC = () => {
    const { isLoading, isError, data, nextHandler, prevHandler, page, refetchCharacters, error } = useCharacters();
    
    if (isLoading) {
        return (
            <div className='characters--loading absolute absolute--center'>
                <Loading/>
            </div>
            )
    }
    
    if (isError) {
        return (
            <div className='characters--loading absolute absolute--center'>
                <Error
                    refetch={refetchCharacters}
                    msg={ error?.data?.error }
                />
            </div>
          )
    }
     
    return (
        <>
            <div className='characters--pagination flex flex--right'>
                <Pagination
                    nextHandler={nextHandler}
                    prevHandler={prevHandler}
                    currentPage={page}
                    pagesCount={data?.info?.pages}
                />
            </div>
            <section className='characters--container'>
                {
                data?.results?.map((character: CharacterType, index: number) => (
                    <div
                        key={character.id}
                        className='character--container'
                        style={{
                            animationDelay: `${100 * index}ms`
                        }}
                    >
                            <Avatar name={character.name} url={character.image}/>
                            <h2 className='character--name'>
                            <Link to={`characters/${character.id}`}> {character.name} </Link>
                            </h2>
                    </div>
                    ))
                }
                </section>
    </>
    )
}

export default Characters;
