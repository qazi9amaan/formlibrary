import React, { ButtonHTMLAttributes } from 'react';
import { isNA } from '@utils/helpers/isNA';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  cs?: string;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'className'>;

export const Button: React.FC<Props> = (props) => {
  const { label, type = 'button', children, cs = '', ...rest } = props;

  return (
    <button {...rest} type={type} className={`btn btn-blue ${cs}`}>
      {isNA(label) ? children : label}
    </button>
  );
};
