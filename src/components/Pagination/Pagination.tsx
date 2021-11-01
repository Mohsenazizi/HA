import { FC } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import Button from '../Button/Button';
import './pagination.style.scss';

interface PaginationProps {
  nextHandler: () => void;
  prevHandler: () => void;
  pagesCount: number | undefined;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = (
  { prevHandler,
    nextHandler,
    currentPage,
    pagesCount = 1 }) => (
        <div className='pagination__container'>
          <Button
            square={true}
            disabled={currentPage === 1}
            customClassNames='pagination__button pagination__button--prev'
            onClick={prevHandler}
            >
          <GrFormPreviousLink/>
          </Button>
          <Button
            square={true}
            disabled={currentPage === pagesCount} customClassNames='pagination__button pagination__button--next'
            onClick={nextHandler}
            >
            <GrFormNextLink/>
          </Button>
        </div>
  )


export default Pagination;