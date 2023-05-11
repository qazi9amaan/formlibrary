import { useFormikContext, FormikContextType, getIn } from 'formik';

type useFormReturnType<Values extends object> = FormikContextType<Values> & {
  setFieldValueAndTouch: (field: string, value: any, touched: boolean) => void;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
};

export const useForm = <Values extends Record<string, any> = any>(): useFormReturnType<Values> => {
  const formik = useFormikContext<Values>();

  const setFieldValueAndTouch = (field: string, value: any, touched = true) => {
    formik.setFieldValue(field, value);
    formik.setFieldTouched(field, touched);
  };

  const getError = (field: string) => {
    const hasError = getIn(formik.errors, field);
    const isTouched = getIn(formik.touched, field);

    if (hasError && isTouched) {
      return getIn(formik.errors, field);
    }

    return undefined;
  };

  const hasError = (field: string) => {
    return getIn(formik.errors, field);
  };

  return {
    ...formik,
    setFieldValueAndTouch,
    getError,
    hasError,
  };
};
