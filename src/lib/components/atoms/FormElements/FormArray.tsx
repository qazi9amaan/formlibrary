import { FieldArray } from 'formik';

type IRenderProps = {
  baseName: string;
  value: Record<string, any>;
  index: number;
  push: (obj: any) => void;
  remove: (index: number) => void;
};

type Props<T = Record<string, any>> = {
  name: string;
  values: T[];
  render: (props: IRenderProps) => JSX.Element;
};

const FormArray = ({ name, values, render }: Props) => {
  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => (
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

export default FormArray;
