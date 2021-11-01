import {FC, HTMLAttributes} from 'react'
import {getNameInitial} from '../../../helpers';
import './avatar.style.scss';

interface AvatarPropTypes extends HTMLAttributes<HTMLDivElement> {
    url: string,
    name: string
} 
const Avatar: FC<AvatarPropTypes> = ({
    url,
    name,
    ...props
}) => {
    return (
        <div
        {...props}
         className='avatar'
         style={{
             backgroundImage: url ? `url(${url})` : ''
         }}
        >
            {!url ? 
            (
            <h2 
             className='avatar__content'
            >
                {getNameInitial(name)}
            </h2>
            ) : ''
            }
        </div>
    )
}
export default Avatar;