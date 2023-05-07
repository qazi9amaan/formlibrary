import { getIn } from 'formik';

export const getFormikError = (formikProps: any, name: string) => {
  if (!formikProps) return null;
  return (
    getIn(formikProps?.errors, name) &&
    getIn(formikProps?.touched, name) &&
    getIn(formikProps?.errors, name)
  );
};
