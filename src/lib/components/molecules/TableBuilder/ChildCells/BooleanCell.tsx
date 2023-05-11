import React from 'react';
import { RxCheck, RxCross1 } from 'react-icons/rx';

type Props = {
  value: string;
};

const BooleanCell: React.FC<Props> = ({ value }) => {
  if (value) {
    return <RxCheck className='text-green-500 text-3xl font-bold' />;
  }
  return <RxCross1 className='text-red-500 text-2xl font-bold' />;
};

export default BooleanCell;
