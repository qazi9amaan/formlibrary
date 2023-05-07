import React from 'react';

type Props = {
  children: React.ReactNode;
  width?: number; // <- %age
  rowGap?: number; //<- em
  columnGap?: number; //<- em
  p?: string; //{top, right, bottom, left}
  className?: string;
};

export const AutoLayout: React.FC<Props> = (props) => {
  //
  const { children, rowGap = 1, columnGap = 0.2, width = 100, p = '1em', className = '' } = props;

  /** ---- render ---- */
  return (
    <section
      className={`flex flex-wrap ${className}`}
      style={{
        width: `${width}%`,
        rowGap: `${rowGap}em`,
        columnGap: `${columnGap}em`,
        padding: p,
      }}
    >
      {children}
    </section>
  );
};
