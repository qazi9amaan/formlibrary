import { Button } from '@lib/components/atoms/Button';
import avoidMultipleClick from '@lib/util/helpers/avoidMultipleClick';
import React from 'react';

export type IPaginationProps = {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
};

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const { page = 1, totalPages, handlePagination } = props;

  return (
    <div className='mt-3 space-x-3'>
      <Button
        onClick={avoidMultipleClick(() => handlePagination?.(page - 1), 150)}
        disabled={page === 1}
        cs='btn-outline-white !rounded-md'
      >
        Previous
      </Button>
      <Button
        onClick={avoidMultipleClick(() => handlePagination?.(page + 1), 150)}
        disabled={page === totalPages}
        cs='btn-outline-white !rounded-md'
      >
        Next
      </Button>
      <span className='px-1 text-gray-500'>
        {page}/{totalPages} pages
      </span>
    </div>
  );
};
