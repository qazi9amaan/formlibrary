import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const FormTitle = ({ children, style }: Props) => {
  return (
    <div className='form--row'>
      <section className='form--section'>
        <h2 className='form--title' style={style}>
          {children}
        </h2>
      </section>
    </div>
  );
};
