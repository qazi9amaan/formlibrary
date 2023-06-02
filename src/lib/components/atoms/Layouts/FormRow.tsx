import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const FormRow = ({ children }: Props) => {
  return (
    <div className='form--row'>
      <section className='form--section'>
        <div className='form--container'>{children}</div>
      </section>
    </div>
  );
};
