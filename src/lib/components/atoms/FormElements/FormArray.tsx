import { ArrayHelpers, FieldArray } from 'formik';

type IRenderProps<T = unknown> = {
  baseName: string;
  value: T;
  index: number;
  hello: boolean;
} & ArrayHelpers;

type Props<T = unknown> = {
  name: string;
  values: T[];
  render: (props: IRenderProps<T>) => JSX.Element;
};

export const FormArray = <T = unknown,>({ name, values, render }: Props<T>) => {
  return (
    <FieldArray
      name={name}
      render={(helpers: ArrayHelpers) =>
        values.map((value, index) => {
          return render({
            baseName: `${name}[${index}]`,
            value,
            index,
            hello: true,
            ...helpers,
          });
        })
      }
    />
  );
};
