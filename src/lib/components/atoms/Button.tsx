import React, { ButtonHTMLAttributes } from 'react';
import { isNA } from '@utils/helpers/isNA';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
};

export const Button: React.FC<Props> = (props) => {
  const { label, type = 'button', children, ...rest } = props;

  const cs =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

  return (
    <button {...rest} type={type} className={cs}>
      {isNA(label) ? children : label}
    </button>
  );
};
