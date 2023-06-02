import React from 'react';
import { isNA } from '@lib/util';

type Props = {
  title: string;
  subTitle?: string;
  style?: React.CSSProperties;
};

export const FormHeader = ({ style, title, subTitle }: Props) => {
  return (
    <div className='form--row !mt-4' style={style}>
      <section className='form--section'>
        <h2 className='form--title'>{title}</h2>
        {!isNA(subTitle) && <p className=' text-gray-500 text-sm mt-0 leading-tight'>{subTitle}</p>}
      </section>
    </div>
  );
};
