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
    <div className='flex flex--vertical flex--v-center error--container'>
      <div className='error--msg'>
        {msg ? msg : 'Something Went Wrong...'}
      </div> 
      <Button
        customClassNames='error--button'
        onClick={refetch}
        square={true}
      >
        <GrFormRefresh/>
      </Button>
    </div>
  )
}

export default Error;
