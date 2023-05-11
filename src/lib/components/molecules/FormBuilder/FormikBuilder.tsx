import { IFormikParent, withForm } from '@lib/hocs';
import { FormikValues } from 'formik';
import { FormBuilder, IFormBuilderProps } from './FormBuilder';
import { useMemo } from 'react';

export type IBuilderProps<V extends FormikValues> = IFormikParent<V, IFormBuilderProps<V>>;

export const FormikBuilder = <V extends FormikValues>(props: IBuilderProps<V>) => {
  const FormikForm = useMemo(() => withForm<V, IBuilderProps<V>>({})(FormBuilder), []);
  return <FormikForm {...props} />;
};
