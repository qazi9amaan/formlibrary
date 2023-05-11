import React from 'react';

type Props = {
  value: string;
};

const ImageCell: React.FC<Props> = ({ value }) => {
  return (
    <div className={`flex items-center`}>
      <div className='flex-shrink-0 h-10 w-10'>
        <img className='h-10 w-10 rounded-full' src={value} alt='' referrerPolicy='no-referrer' />
      </div>
    </div>
  );
};

export default ImageCell;
