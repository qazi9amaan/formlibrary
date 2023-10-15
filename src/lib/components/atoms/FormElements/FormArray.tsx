import { FieldArray } from 'formik';

type IRenderProps = {
  baseName: string;
  value: any;
  index: number;
  push: (obj: any) => void;
  remove: (index: number) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: any) => void;
  unshift: (value: any) => number;
  replace: (index: number, value: any) => void;
};

type Props<T = any> = {
  name: string;
  values: T[];
  render: (props: IRenderProps) => JSX.Element;
};

export const FormArray = <T = any,>({ name, values, render }: Props<T>) => {
  return (
    <FieldArray
      name={name}
      render={({ push, remove, swap, move, insert, unshift, replace }: any) => (
        <>
          {values.map((value, index) => {
            const baseName = `${name}[${index}]`;
            return render({
              baseName,
              value,
              index,
              push,
              remove,
              swap,
              move,
              insert,
              unshift,
              replace,
            });
          })}
        </>
      )}
    />
  );
};
