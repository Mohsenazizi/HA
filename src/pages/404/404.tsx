import './404.style.scss';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

const NotFound = () => {
  return (
    <div className='absolute absolute--center flex flex--vertical flex--v-center not-found--container'>
      This Page does Not Exist!!!
      <div>
      <Link to='/'>
      <AiFillHome/>
      </Link>
     </div>
    </div>
  )
}

export default NotFound;
