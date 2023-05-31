import { IConfig, IFormikProps, withForm } from '@lib/hocs';
import { FormikValues } from 'formik';
import { FormBuilder, IFormBuilderProps } from './FormBuilder';
import { useMemo } from 'react';

export type IBuilderProps<V extends FormikValues> = IFormBuilderProps<V>;

export const FormikBuilder = <V extends FormikValues>(
  props: IBuilderProps<V> & IConfig<V> & IFormikProps<V>,
) => {
  const { validationSchema, disabler, ...rest } = props;

  const FormikForm = useMemo(
    () => withForm<V, IBuilderProps<V>>({ validationSchema, disabler })(FormBuilder),
    [validationSchema, disabler],
  );
  return <FormikForm {...rest} />;
};
