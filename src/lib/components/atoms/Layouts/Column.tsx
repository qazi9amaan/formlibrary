import React from 'react';

type Props = {
  children: React.ReactNode;
  width?: number; // <- %age
  spaceBetween?: number; //<- em
  p?: string; //{top, right, bottom, left}
  className?: string;
};

export const Column: React.FC<Props> = (props) => {
  //
  const { children, spaceBetween = 1, width = 100, p = '1em', className = '' } = props;

  /** ---- render ---- */
  return (
    <section
      className={`flex flex-row items-end ${className}`}
      style={{
        minWidth: `${width}%`,
        maxWidth: `${width}%`,
        gap: `${spaceBetween}em`,
        padding: p,
      }}
    >
      {children}
    </section>
  );
};
