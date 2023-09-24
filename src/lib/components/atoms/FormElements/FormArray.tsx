import { FieldArray } from 'formik';

type IRenderProps = {
  baseName: string;
  value: any;
  index: number;
  push: (obj: any) => void;
  remove: (index: number) => void;
};

type Props<T = any[]> = {
  name: string;
  values: T[];
  render: (props: IRenderProps) => JSX.Element;
};

export const FormArray = ({ name, values, render }: Props) => {
  return (
    <FieldArray
      name={name}
      render={({ push, remove }: any) => (
        <>
          {values.map((value, index) => {
            const baseName = `${name}[${index}]`;
            return render({ baseName, value, index, push, remove });
          })}
        </>
      )}
    />
  );
};
