import { IFormikParent, withForm } from '@lib/hocs';
import { FormikValues } from 'formik';
import { FormBuilder, IFormBuilderProps } from './FormBuilder';

export type IBuilderProps<V extends FormikValues> = IFormikParent<V, IFormBuilderProps<V>>;

export const FormikBuilder = <V extends FormikValues>(props: IBuilderProps<V>) => {
  const FormikForm = withForm<V, IBuilderProps<V>>({})(FormBuilder);
  return <FormikForm {...props} />;
};
