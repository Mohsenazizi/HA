import { FC } from 'react'
import Button from '../Button/Button';
import { GrFormRefresh } from 'react-icons/gr';
import './error.style.scss';

interface ErrorProps {
  msg?: string;
  refetch:() => void;
}

const Error: FC<ErrorProps> = ({
  msg,
  refetch
}) => {
  return (
    <div className='flex flex__vertical flex__v-center error__container'>
      <div className='error__msg'>
        {msg ? msg : 'Something Went Wrong...'}
      </div> 
      <Button
        customClassNames='error__button'
        onClick={refetch}
        square={true}
      >
        <GrFormRefresh/>
      </Button>
    </div>
  )
}

export default Error;
